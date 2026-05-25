import { Request, Response } from 'express';
import { UserRepository } from './users.repository';

// GET ALL USERS
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepository.findAll();

    return res.status(200).json(users);
  } catch (err: any) {
    console.log('Get all users error:', err.message);

    return res.status(500).json({
      message: `Get all users error: ${err.message}`,
    });
  }
};

// DELETE USER
const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserRepository.delete(req.params.id);

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (err: any) {
    console.log('Delete user error:', err.message);

    return res.status(500).json({
      message: `Delete user error: ${err.message}`,
    });
  }
};

export const UserController = {
  getAllUsers,
  deleteUser,
};