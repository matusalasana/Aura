import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useBecomeVendor } from "../hooks/useBecomeVendor"
import { vendorApplicationSchema, type VendorApplicationInput } from "../schemas";
import ImageUpload from "./ImageUpload"
import { ArrowLeft, ArrowRight } from "lucide-react";

const BecomeVendorForm = () => {
  const [step, setStep] = useState(1);
  const { mutate:becomeVendor, isPending } = useBecomeVendor();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VendorApplicationInput>({
    resolver: zodResolver(vendorApplicationSchema),
    mode: "onChange",
  });

  const logo = watch("logo");
  const banner = watch("banner");
  const license = watch("license");

  const handleFileChange = (field: keyof VendorApplicationInput, file?: File) => {
    if (file) {
      setValue(field, file, { shouldValidate: true });
    }
  };

  const nextStep = async () => {
    let fields: any[] = [];

    if (step === 1) {
      fields = ["store_name", "description"];
    }
    
    if (step === 2) {
      fields = ["payout_email", "tin_number"];
    }

    if (step === 3) {
      fields = ["logo", "banner"];
    }

    if (step === 4) {
      fields = ["license"];
    }

    const valid = await trigger(fields);

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const submit = (data: VendorApplicationInput) => {
    console.log("SUBMITTING", data);
  
    const formData = new FormData();
  
    formData.append("store_name", data.store_name);
    formData.append("description", data.description);
    formData.append("logo", data.logo);
    formData.append("banner", data.banner);
    formData.append("license", data.license);
  
    becomeVendor(formData);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-12">
      <div className="max-w-xl mx-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8">
        <h1 className="text-3xl font-bold">Become a Vendor</h1>

        <div className="mt-6 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`
                h-2 flex-1 rounded-full
                ${step >= i ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-700"}
              `}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(submit)} className="mt-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <input
                {...register("store_name")}
                placeholder="Store name"
                className="w-full rounded-xl border p-3 dark:bg-zinc-800"
              />
              <p className="text-red-500 text-sm">{errors.store_name?.message}</p>

              <textarea
                {...register("description")}
                placeholder="Tell customers about your store"
                rows={5}
                className="w-full rounded-xl border p-3 dark:bg-zinc-800"
              />
              <p className="text-red-500 text-sm">{errors.description?.message}</p>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-4">
              <input
                {...register("payout_email")}
                placeholder="payout email"
                className="w-full rounded-xl border p-3 dark:bg-zinc-800"
              />
              <p className="text-red-500 text-sm">{errors.payout_email?.message}</p>

              <input
                {...register("tin_number")}
                placeholder="TIN nō"
                className="w-full rounded-xl border p-3 dark:bg-zinc-800"
              />
              <p className="text-red-500 text-sm">{errors.tin_number?.message}</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <ImageUpload
                title="Store Logo"
                preview={logo ? URL.createObjectURL(logo) : null}
                onChange={(file) => handleFileChange("logo", file)}
              />

              <ImageUpload
                title="Store Banner"
                preview={banner ? URL.createObjectURL(banner) : null}
                onChange={(file) => handleFileChange("banner", file)}
              />
            </div>
          )}

          {step === 4 && (
            <ImageUpload
              title="Business License"
              preview={license ? URL.createObjectURL(license) : null}
              onChange={(file) => handleFileChange("license", file)}
            />
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={previousStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-black"
              >
                Next
                <ArrowRight size={18} />
              </button>
            )}

            {step === 4 && (
              <button type="submit" disabled={isPending} className="ml-auto rounded-xl bg-amber-500 px-5 py-3 text-black">
                {isPending
                  ? "Submitting"
                  : "Submit Application"
                }
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeVendorForm;