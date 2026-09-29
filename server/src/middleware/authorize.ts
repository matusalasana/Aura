import { Request, Response, NextFunction } from "express";

import { auth } from "@/config/auth.js";
import type { Permission } from "@/modules/auth/auth.permissions.js";
import { rolePermissions } from "@/modules/auth/auth.roles.js";
import { AuthRepository } from "@/modules/auth/auth.repository.js";
import logger from "@/utils/logger.js";


export const hasRolePermission = (
  membership: string,
  permission: Permission
) => {
  
  const permissions = rolePermissions[membership];
  console.log(membership)
  console.log(permission)
  console.log(permissions)
  if (!permissions) {
    return false;
  }

  return permissions.includes(permission);
};