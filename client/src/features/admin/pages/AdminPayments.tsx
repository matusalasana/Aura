import PlanForm from "@/components/forms/PlanForm";
import type { Plan } from "@/types/plan";
import { useCreatePlan } from "@/features/admin/hooks/useCreatePlan";



export default function AdminPayments() {
  const { mutate: createPlan } = useCreatePlan();
  
  const handleCreatePlan = (data: Plan) => {

    createPlan(data)
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Create a plan
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure pricing, features, and the plan's call to action.
        </p>
      </div>

      <PlanForm onSubmit={handleCreatePlan} />
    </div>
  );
}