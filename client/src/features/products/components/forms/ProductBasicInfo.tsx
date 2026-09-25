import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";

import {
  basicInfoSchema,
  type BasicInfoData,
} from "@/features/products/schemas";

interface Props {
  defaultValues: BasicInfoData;
  onClickNext: (data: BasicInfoData) => void;
}

const ProductBasicInfo = ({onClickNext, defaultValues}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues
  });

  const onSubmit = (data: BasicInfoData) => {
    console.log("Basic Info:", data);
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
            Basic Information
          </h2>

          <p className="subheading mt-1 text-xs">
            Add the basic information about your product.
          </p>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="label">
            Product Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Khaki Jeans"
            className="input"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Product Slug */}
        <div>
          <label htmlFor="slug" className="label">
            Product Slug
          </label>

          <input
            id="slug"
            type="text"
            placeholder="Khaki-jeans"
            className="input"
            {...register("slug")}
          />

          {errors.slug && (
            <p className="text-destructive mt-1">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="label">
            Description
          </label>

          <textarea
            id="description"
            placeholder="Tell customers about your product..."
            className="textarea"
            {...register("description")}
          />

          {errors.description && (
            <p className="text-destructive mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Product Type */}
        <div>
          <label htmlFor="name" className="label">
            Does this product have variations like multiple sizes, colors, or packages?
          </label>

          <select
            id="type"
            type="text"
            className="input"
            {...register("type")}
          >
            <option value="">Select Type</option>
            <option value="simple">Simple Product</option>
            <option value="variant">Variant Product</option>
          </select>

          {errors.type && (
            <p className="text-destructive mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn-primary gap-2 text-xs"
          >
            Next: Inventory 
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
      </form>
    </main>
  );
};

export default ProductBasicInfo;