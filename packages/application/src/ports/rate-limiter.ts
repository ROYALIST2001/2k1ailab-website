export type RateLimitDecision = {
  allowed: boolean;
  /** Seconds until the window resets. Sent as Retry-After when blocked. */
  retryAfter: number;
};

export type RateLimitOptions = {
  /** Maximum attempts permitted per window. */
  limit: number;
  windowMs: number;
};

/**
 * Outbound port for throttling.
 *
 * The policy (how many, how often) is decided by the caller; the mechanism
 * (in-memory map, Redis, an API gateway) is an infrastructure concern. Keeping
 * this an interface is what lets the in-memory adapter be swapped for a shared
 * store without touching a single route.
 */
export interface RateLimiter {
  check(key: string, options: RateLimitOptions): Promise<RateLimitDecision> | RateLimitDecision;
}
