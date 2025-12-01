import rateLimit from "express-rate-limit";

// General rate limiter: 100 requests per 15 minutes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Don't rate limit health checks
    return req.path === "/health";
  },
});

// Strict rate limiter for auth endpoints: 5 requests per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Only 5 login attempts per 15 minutes
  message:
    "Too many login attempts from this IP, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count successful requests too
  skipFailedRequests: false, // Count failed requests too
  keyGenerator: (req) => {
    // Use email as part of the key for more granular rate limiting
    const email = req.body?.email || req.ip;
    return `${req.ip}:${email}`;
  },
});

// Signup rate limiter: 3 signups per hour per IP
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Only 3 signup attempts per hour
  message:
    "Too many signups from this IP, please try again after an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment rate limiter: 10 payment attempts per 10 minutes
export const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message:
    "Too many payment attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
