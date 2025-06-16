import rateLimit from "express-rate-limit";

const rateLimiteTime = process.env.RATE_LIMIT_TIME || "60";
const rateLimiteRequests = process.env.RATE_LIMIT_REQUESTS || "10";

export const apiLimiter = rateLimit({
  windowMs:  60 * 1000 * +rateLimiteTime,
  max: +rateLimiteRequests,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
