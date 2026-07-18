import { uploadToCloudinary } from "../../utils/cloudinary";
import { ProductsRepository } from "./products.repository";
import { VendorsRepository } from "../vendors/vendors.repository";


// CREATE PRODUCT
const createProduct = async ({
  userId,
  body,
  thumbnail_buffer,
  image_buffers = [],
}) => {

  const {
    name,
    description,
    price,
    category_id,
    stock,
  } = body;


  const vendor = await VendorsRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  if (vendor.status !== "approved") {
    throw new Error("Vendor is not approved");
  }


  const existing = await ProductsRepository.findByName(
    name,
    vendor.id
  );

  if (existing) {
    throw new Error("Product already exists");
  }


  const thumbnail = await uploadToCloudinary(
    thumbnail_buffer,
    `products/${vendor.id}/thumbnail`
  );


  const images = await Promise.all(
    image_buffers.map((buffer) =>
      uploadToCloudinary(
        buffer,
        `products/${vendor.id}/images`
      )
    )
  );


  return ProductsRepository.createProduct({
    vendorId: vendor.id,

    name,
    description,
    price,
    categoryId: category_id,
    stock,

    thumbnailUrl: thumbnail.secure_url,

    images: images.map((image) => ({
      url: image.secure_url,
      publicId: image.public_id,
    })),
  });
};



// GET MY PRODUCTS
const getMyProducts = async ({
  userId,
  query,
}) => {

  const vendor = await VendorsRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }


  return ProductsRepository.findByVendor(
    vendor.id,
    query
  );
};



// GET ALL PRODUCTS

const getAllProducts = async (
  query:any
) => {
  return ProductsRepository.findAll(query);
};



// GET PRODUCT BY ID

const getProductById = async (
  productId:string
) => {

  const product = await ProductsRepository.findById(productId);

  if(!product){
    throw new Error("Product not found");
  }


  return product;
};



// UPDATE PRODUCT

const updateProduct = async ({
  productId,
  userId,
  body,
}) => {

  const vendor = await VendorsRepository.findByUserId(userId);

  if(!vendor){
    throw new Error("Vendor not found");
  }


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error(
      "You are not allowed to update this product"
    );
  }


  const data:any = {};


  if(body.name !== undefined){
    data.name = body.name;
  }


  if(body.description !== undefined){
    data.description = body.description;
  }


  if(body.price !== undefined){
    data.price = body.price;
  }


  if(body.stock !== undefined){
    data.stock = body.stock;
  }


  if(body.category_id !== undefined){
    data.categoryId = body.category_id;
  }


  return ProductsRepository.update(
    productId,
    data
  );
};



// DELETE PRODUCT

const deleteProduct = async ({
  productId,
  userId,
}) => {


  const vendor =
    await VendorsRepository.findByUserId(userId);


  if(!vendor){
    throw new Error("Vendor not found");
  }


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error(
      "You are not allowed to delete this product"
    );
  }


  return ProductsRepository.delete(productId);
};



// UPLOAD THUMBNAIL

const uploadThumbnail = async ({
  productId,
  userId,
  thumbnail_buffer,
}) => {


  if(!thumbnail_buffer){
    throw new Error("Thumbnail is required");
  }


  const vendor =
    await VendorsRepository.findByUserId(userId);


  if(!vendor){
    throw new Error("Vendor not found");
  }


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error(
      "Not allowed"
    );
  }


  const image =
    await uploadToCloudinary(
      thumbnail_buffer,
      `products/${vendor.id}/thumbnail`
    );


  await ProductsRepository.update(
    productId,
    {
      thumbnailUrl:image.secure_url,
    }
  );


  return {
    message:"Thumbnail uploaded successfully",
  };
};



// UPLOAD PRODUCT IMAGES

const uploadImages = async ({
  productId,
  userId,
  image_buffers,
}) => {


  const vendor =
    await VendorsRepository.findByUserId(userId);


  if(!vendor){
    throw new Error("Vendor not found");
  }


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error("Not allowed");
  }



  const images =
    await Promise.all(
      image_buffers.map((buffer)=> 
        uploadToCloudinary(
          buffer,
          `products/${vendor.id}/images`
        )
      )
    );


  return ProductsRepository.createImages(
    productId,
    images.map((image)=>({
      url:image.secure_url,
      publicId:image.public_id,
    }))
  );
};



// DELETE IMAGE

const deleteImage = async ({
  productId,
  imageId,
  userId,
}) => {


  const vendor =
    await VendorsRepository.findByUserId(userId);


  if(!vendor){
    throw new Error("Vendor not found");
  }


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error("Not allowed");
  }


  return ProductsRepository.deleteImage(imageId);
};



// PUBLISH PRODUCT

const publishProduct = async ({
  productId,
  userId,
}) => {


  const vendor =
    await VendorsRepository.findByUserId(userId);


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error("Not allowed");
  }


  return ProductsRepository.update(
    productId,
    {
      isPublished:true,
    }
  );
};



// UNPUBLISH PRODUCT

const unpublishProduct = async ({
  productId,
  userId,
}) => {


  const vendor =
    await VendorsRepository.findByUserId(userId);


  const product =
    await ProductsRepository.findById(productId);


  if(!product){
    throw new Error("Product not found");
  }


  if(product.vendorId !== vendor.id){
    throw new Error("Not allowed");
  }


  return ProductsRepository.update(
    productId,
    {
      isPublished:false,
    }
  );
};



// EXPORT

export const ProductsService = {
  createProduct,

  getMyProducts,
  getAllProducts,
  getProductById,

  updateProduct,
  deleteProduct,

  uploadThumbnail,
  uploadImages,
  deleteImage,

  publishProduct,
  unpublishProduct,
};