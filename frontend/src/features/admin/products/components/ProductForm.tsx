import BasicInfoForm from './BasicInfoForm'
import VariantsForm from './VariantsForm'
import ProductImagesUploader from './ProductImagesUploader'

const ProductForm = () => {
  return (
    <div>
      <BasicInfoForm />
      <VariantsForm />
      <ProductImagesUploader />
    </div>
  )
}

export default ProductForm