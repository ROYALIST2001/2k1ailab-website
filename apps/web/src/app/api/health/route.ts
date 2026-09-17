import { NextResponse } from 'next/server';

/**
 * Liveness probe for Docker/compose healthchecks and load balancers.
 *
 * Deliberately shallow: it reports that the process is serving requests, not
 * that downstream dependencies are reachable. A probe that fails when the
 * backend is down would take the website offline for visitors who only want to
 * read the marketing pages.
 */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ status: 'ok', uptime: process.uptime() }, { status: 200 });
}
