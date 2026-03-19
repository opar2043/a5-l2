import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum Role {
    CUSTOMER = "CUSTOMER",
    PROVIDER = "PROVIDER",
    ADMIN = "ADMIN"
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: Role;
        emailVerified: boolean;
      };
    }
  }
}

// Role-based checker middleware
const checker = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get session from BetterAuth
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      // Attach user info to request
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as Role,
        emailVerified: session.user.emailVerified,
      };

      // Check if user role is allowed
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You do not have permission.",
        });
      }

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};

export default checker;