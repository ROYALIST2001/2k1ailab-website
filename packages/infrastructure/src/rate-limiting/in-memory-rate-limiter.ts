import type { RateLimitDecision, RateLimitOptions, RateLimiter } from '@company/application';

type Window = { count: number; resetAt: number };

/**
 * Fixed-window rate limiter, in memory.
 *
 * ⚠️ Per-instance and non-persistent: it resets on redeploy and does not
 * coordinate across serverless instances or replicas. That is enough to blunt
 * casual form spam, and nothing more. Before relying on this in production,
 * write a Redis-backed adapter against the same `RateLimiter` port — no route
 * or use case has to change.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private readonly windows = new Map<string, Window>();

  constructor(private readonly maxTrackedKeys = 10_000) {}

  check(key: string, options: RateLimitOptions): RateLimitDecision {
    const now = Date.now();
    const existing = this.windows.get(key);

    if (!existing || now >= existing.resetAt) {
      // Opportunistic eviction: without this the map grows unbounded under a
      // spray of unique IPs, which is itself a memory-exhaustion vector.
      if (this.windows.size >= this.maxTrackedKeys) {
        for (const [k, w] of this.windows) {
          if (now >= w.resetAt) this.windows.delete(k);
        }
      }

      this.windows.set(key, { count: 1, resetAt: now + options.windowMs });
      return { allowed: true, retryAfter: 0 };
    }

    existing.count += 1;

    if (existing.count > options.limit) {
      return { allowed: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
    }

    return { allowed: true, retryAfter: 0 };
  }
}
