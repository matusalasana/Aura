import { useState } from "react";

import ProductBasicInfo from "@/features/products/components/forms/ProductBasicInfo";
import ProductInventory from "@/features/products/components/forms/ProductInventory";
import ProductVariants from "@/features/products/components/forms/ProductVariants";
import ProductReview from "@/features/products/components/forms/ProductReview";
import ProgressIndicator from "@/features/products/components/forms/ProgressIndicator";

import type {
  BasicInfoData,
  VariantsData,
  InventoryInfoData,
} from "@/features/products/schemas";
import { useCreateProduct } from "@/features/products/hooks/useCreateProduct";

const ProductForm = () => {
  const { mutate: createProduct, isPending  } = useCreateProduct();
  
  const [step, setStep] = useState(1);

  const initialBasicData: BasicInfoData = {
    name: "",
    description: "",
    slug: "",
    type: "simple",
  };
  
  const initialInventoryData: InventoryInfoData = {
    price: 0,
    stock: 0,
    sku: "",
    status: "draft",
  };

  const [basicData, setBasicData] = useState<BasicInfoData>(initialBasicData);

  const [inventoryData, setInventoryData] =
    useState<InventoryInfoData>(initialInventoryData);

  const [variantsData, setVariantsData] =
    useState<VariantsData[]>([]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const product = basicData.type === "simple"
        ? {...basicData, ...inventoryData}
        : {...basicData}
    
    const productData = {
      productData: product,
      variantsData,
    };
    createProduct(productData, {
      onSuccess: () => {
        setBasicData(initialBasicData)
        setInventoryData(initialInventoryData)
        setVariantsData([])
        setStep(1)
      }
    })
  }

  return (
    <div className="flex flex-col items-center">
      <ProgressIndicator
        step={step}
        type={basicData.type}
      />

      {step === 1 && (
        <ProductBasicInfo
          defaultValues={basicData}
          onClickNext={(data) => {
            setBasicData(data);
            nextStep();
          }}
        />
      )}

      {(basicData.type === "variant" && step === 2) && (
        <ProductVariants
          variants={variantsData}
          onClickNext={(data) => {
            setVariantsData(data);
            nextStep();
          }}
          onClickPrev={prevStep}
        />
      )}

      {(basicData.type === "simple" && step === 2) && (
        <ProductInventory
          defaultValues={inventoryData}
          onClickNext={(data) => {
            setInventoryData(data);
            nextStep();
          }}
          onClickPrev={prevStep}
        />
      )}

      {step === 3 && (
        <ProductReview
          isCreating={isPending}
          type={basicData.type}
          basicData={basicData}
          variantsData={variantsData}
          inventoryData={inventoryData}
          onClickPrev={prevStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ProductForm;