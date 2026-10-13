import { db } from "@/db/index.js";
import { plans } from "@/db/schema/plans.js";
import type { UpdatePlanInput, CreatePlanInput } from "@/modules/payments/payment.validations.js";


const create = async (data: CreatePlanInput) => {
  return await db
    .insert(plans)
    .values(data);
};

const findAll = async () => {
  return await db.query.plans.findMany();
};




export const PaymentRepository = {
  create,
  findAll,
}