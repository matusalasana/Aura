import { Request, Response } from "express";

import { AuthService } from "./auth.service.js";


// send otp
const sendOTP = async (
  req: Request,
  res: Response,
) => {
  const { email, name, type } = req.body;
  await AuthService.sendOTP({name, type, email});

  return res.status(200).json({
    success: true,
    message: "OTP sent, please check your  email",
  });
};


// verify otp
const verifyOTP = async (
  req: Request,
  res: Response,
) => {
  const { otp, type, email } = req.body;

  console.log(req.body)
  await AuthService.verifyOTP({
    email,
    otp,
    type
  });

  return res.status(200).json({
    success: true,
    message: "Signed up successfully",
  });
};


// resend otp
const resendOTP = async (
  req: Request,
  res: Response,
) => {
  const { type, email } = req.body;
  
  await AuthService.resendOTP({
    email,
    type
  });

  return res.status(200).json({
    success: true,
    message: "OTP sent, please check your  email",
  });
};


// GET ME
const getMe = async (
  req: Request,
  res: Response
) => {
  const user = await AuthService.getMe(req.user!.id);

  res.json({
    success: true,
    data: user,
  });
};




export const AuthController = {
  getMe,
  sendOTP,
  verifyOTP,
  resendOTP,
};