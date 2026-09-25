import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft } from "lucide-react";

import {
  inventoryInfoSchema,
  type InventoryInfoData,
} from "@/features/products/schemas";

interface Props {
  onClickNext: (data: InventoryInfoData) => void;
  onClickPrev: () => void;
  defaultValues: InventoryInfoData;
}

const ProductInventory = ({onClickNext, onClickPrev, defaultValues}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InventoryInfoData>({
    resolver: zodResolver(inventoryInfoSchema),
    defaultValues
  });

  const onSubmit = (data: InventoryInfoData) => {
    console.log("Inventory Info:", data);
    onClickNext(data)
  };

  return (
    <main className="card w-full max-w-2xl shadow-lg animate-scale-in">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        <div>
          <h2 className="heading text-xl font-bold">
            Inventory Information
          </h2>

          <p className="subheading mt-1 text-xs">
            Set your product price and stock details.
          </p>
        </div>

        {/* Product Price */}
        <div>
          <label htmlFor="price" className="label">
            Product Price
          </label>

          <input
            id="price"
            type="number"
            placeholder="2,000"
            className="input"
            {...register("price", { valueAsNumber: true })}
          />

          {errors.price && (
            <p className="text-destructive mt-1">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Product in Stock  */}
        <div>
          <label htmlFor="stock" className="label">
            Product in Stock
          </label>

          <input
            id="stock"
            type="number"
            placeholder="100"
            className="input"
            {...register("stock", { valueAsNumber: true })}
          />

          {errors.stock && (
            <p className="text-destructive mt-1">
              {errors.stock.message}
            </p>
          )}
        </div>

        {/* SKU */}
        <div>
          <label htmlFor="description" className="label">
            SKU
          </label>

          <input
            id="description"
            type="text"
            placeholder="KAH-WHT-XL"
            className="input"
            {...register("sku")}
          />

          {errors.sku && (
            <p className="text-destructive mt-1">
              {errors.sku.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="label">
            Status
          </label>

          <select
            id="status"
            className="input"
            {...register("status")}
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="active">Active</option>
          </select>

          {errors.status && (
            <p className="text-destructive mt-1">
              {errors.status.message}
            </p>
          )}
        </div>


        <div className="flex-between pt-4">
          <button
            type="button"
            onClick={onClickPrev}
            className="btn-ghost gap-2 text-xs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            type="submit"
            className="btn-primary gap-2 text-xs"
          >
            Next: Review & Publish
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
      </form>
    </main>
  );
};

export default ProductInventory;