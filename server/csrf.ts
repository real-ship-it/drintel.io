import Tokens from "csrf";
import type { Request, Response, NextFunction } from "express";

const tokens = new Tokens();

// Store CSRF tokens per session (in production, use Redis/database)
const tokenStore = new Map<string, string>();

export function generateCsrfToken(sessionId: string): string {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  tokenStore.set(sessionId, secret);
  return token;
}

export function verifyCsrfToken(sessionId: string, token: string): boolean {
  const secret = tokenStore.get(sessionId);
  if (!secret) {
    return false;
  }
  return tokens.verify(secret, token);
}

export function csrfMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip CSRF check for GET, HEAD, OPTIONS requests (they don't change state)
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    return next();
  }

  // Skip CSRF check for login/signup (they don't have a session yet)
  if (
    req.path === "/api/auth/login" ||
    req.path === "/api/auth/signup" ||
    req.path === "/api/csrf-token"
  ) {
    return next();
  }

  // Require authentication for CSRF-protected endpoints
  if (!req.session?.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const csrfToken = req.headers["x-csrf-token"] as string;
  if (!csrfToken) {
    return res.status(403).json({ error: "CSRF token missing" });
  }

  if (!verifyCsrfToken(req.session.userId, csrfToken)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
}
