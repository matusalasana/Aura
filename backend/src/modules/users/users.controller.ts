import { Request, Response } from 'express';
import { UserRepository } from './users.repository';
import { asyncHandler } from '../../utils/asyncHandler';
import { ApiResponse } from '../../utils/ApiResponse';

export class UserController {
  static getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await UserRepository.findAll();
    return res.status(200).json(new ApiResponse(200, users, 'Users fetched successfully'));
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await UserRepository.delete(req.params.id);
    return res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
  });
}
