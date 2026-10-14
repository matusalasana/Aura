import type { Request, Response, NextFunction } from "express";

import type { Permission } from "@/modules/auth/auth.permissions.js";
import { rolePermissions, type Role } from "@/modules/auth/auth.roles.js";


export const hasRolePermission = (
  role: Role,
  permission: Permission,
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const userRole = req.user.role as Role;

    if (!userRole || userRole !== role) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    const permissions = rolePermissions[userRole];

    if (!permissions?.includes(permission)) {
      return res.status(403).json({
        message: "Insufficient permission",
      });
    }

    return next();
  };
};
