import { Request, Response } from "express";

import type { UpdatePlanInput, CreatePlanInput } from "@/modules/payments/payment.validations.js";
import { PaymentService } from "@/modules/payments/payment.service.js";



const createPlan = async (
  req: Request,
  res: Response
) => {

  const data = req.body as CreatePlanInput;
  
  const plan = await PaymentService.createPlan(data);

  return res.status(200).json({
    message: "Payment plan created successfully",
    success: true,
    data: plan
  });

};

const getPlans = async (
  req: Request,
  res: Response
) => {

  const plans = await PaymentService.getPlans();

  return res.status(200).json({ 
    success: true,
    data: plans 
  });

};



export const PaymentController = {
  createPlan,
  getPlans,
}