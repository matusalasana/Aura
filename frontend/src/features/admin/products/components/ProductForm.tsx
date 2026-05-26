import ProgressBar from './ProgressBar'
import BasicInfoForm from './BasicInfoForm'
import VariantsForm from './VariantsForm'
import ProductImagesUploader from './ProductImagesUploader'

const ProductForm = () => {
  return (
    <div>
      <ProgressBar 
      />
      <BasicInfoForm />
      <VariantsForm />
      <ProductImagesUploader />
    </div>
  )
}

export default ProductForm