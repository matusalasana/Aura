import { ImageUp } from "lucide-react";
import React, { useState, useRef } from "react";
import { uploadMultipleToCloudinary } from "../../../../shared/utils/uploadToCloudinary";

const ProductImagesUploader = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
  
    try {
      setLoading(true);
  
      const urls = await uploadMultipleToCloudinary(files);
      setLoading(urls);
  
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      
      <div className="flex gap-3 lg:gap-5 my-5">
      {selectedImages.map((url) => (
        <img 
          src ={url} 
          alt="Product images"
          className="backdrop-blur w-20 h-20 object-cover rounded"
        />
      ))}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="flex gap-3 items-center justify-center bg-indigo-100 dark:text-white px-4 py-2 rounded-lg shadow-lg"
      >
        <p>{loading ? "Uploading" : "Upload Image(s)"}</p>
        <ImageUp size={16} className="text-indigo-600"/>
      </button>
      
    </div>
    
  )
  
}

export default ProductImagesUploader