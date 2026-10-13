import { PaymentRepository } from "@/modules/payments/payment.repository.js";
import type { UpdatePlanInput, CreatePlanInput } from "@/modules/payments/payment.validations.js";


const createPlan = async(data: CreatePlanInput) => {
  return await PaymentRepository.create(data);
}

const getPlans = async() => {
  return await PaymentRepository.findAll();
}




export const PaymentService = {
  createPlan,
  getPlans
}