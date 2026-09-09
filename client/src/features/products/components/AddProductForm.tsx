import { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ProductFormData, productSchema } from "../schemas";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function AddProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct();

  const [step, setStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
    },
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const thumbnail = watch("thumbnail");
  const images = watch("images");
  const name = watch("name");
  const price = watch("price");
  const stock = watch("stock");

  // THUMBNAIL
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("thumbnail", file, {
      shouldValidate: true,
    });

    setThumbnailPreview(URL.createObjectURL(file));
  };

  // MULTIPLE IMAGES
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setValue("images", files, {
      shouldValidate: true,
    });

    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index: number) => {
    const productImages = images.filter((_, i) => i !== index);

    setValue("images", productImages, {
      shouldValidate: true,
    });

    setImagePreviews(productImages.map((file) => URL.createObjectURL(file)));
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submit = (data: ProductFormData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", String(data.price));
    formData.append("stock", String(data.stock));
    formData.append("category_id", data.category_id);
    formData.append("thumbnail", data.thumbnail);
    formData.append("name", data.name);
    data.images.forEach((image) => formData.append("images", image));

    createProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      {/* STEP INDICATOR */}
      <div className="flex gap-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`
              h-2 flex-1 rounded-full
              ${step >= item ? "bg-amber-500" : "bg-zinc-200 dark:bg-zinc-800"}
            `}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <input
            {...register("name")}
            placeholder="Product name"
            className="input"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <textarea
            {...register("description")}
            placeholder="Description"
            className="input"
          />

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            placeholder="Price"
          />

          <input
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
            placeholder="Stock"
          />

          <select {...register("category_id")}>
            <option value="">Select category</option>
            <option value="1">Hoodies</option>
          </select>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label>Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                className="mt-3 h-32 w-32 rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <label>Product images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {imagePreviews.map((src, index) => (
                <div key={src} className="relative">
                  <img
                    src={src}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="rounded-xl border p-5">
          <h2 className="font-bold">Review Product</h2>
          <p>Name: {name}</p>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
          {thumbnailPreview && (
            <img src={thumbnailPreview} className="mt-4 h-32 rounded-lg" />
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={previousStep}
          disabled={step === 1}
          className="btn"
        >
          <ChevronLeft />
          Back
        </button>

        {step < 3 ? (
          <button type="button" onClick={nextStep} className="btn-primary">
            Next
            <ChevronRight />
          </button>
        ) : (
          <button type="submit" className="btn-primary" disabled={isPending}>
            {isPending ? "Creating..." : "Create Product"}
          </button>
        )}
      </div>
    </form>
  );
}