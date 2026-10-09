import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import ProductForm from "@/features/products/components/forms/ProductForm";

type ProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProductModal = ({
  open,
  onOpenChange,
}: ProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      
      <DialogContent showCloseButton className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <ProductForm />
      </DialogContent>
      
      
    </Dialog>
  );
};

export default ProductModal;