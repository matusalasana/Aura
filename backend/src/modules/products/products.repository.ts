import { db } from "../../db";
import { products } from "../../db/schema/products";
import { productImages } from "../../db/schema/productImages";
import { eq, desc, and } from "drizzle-orm";


// FIND BY ID

const findById = async (
  id: string
) => {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  return result[0] || null;
};



// FIND BY NAME (vendor duplicate check)

const findByName = async (
  name: string,
  vendorId: string
) => {
  const result = await db
    .select()
    .from(products)
    .where(
      and(
        eq(products.name, name),
        eq(products.vendorId, vendorId)
      )
    )
    .limit(1);


  return result[0] || null;
};



// CREATE PRODUCT

const createProduct = async (
  data: any
) => {

  const {
    images,
    ...productData
  } = data;


  const [product] = await db
    .insert(products)
    .values(productData)
    .returning();


  if(images && images.length > 0){

    await db
      .insert(productImages)
      .values(
        images.map((image:any)=>({
          productId: product.id,
          imageUrl: image.url,
          publicId: image.publicId,
        }))
      );

  }


  return product;
};



// FIND PRODUCTS BY VENDOR

const findByVendor = async (
  vendorId:string,
  query?:any
) => {

  return db
    .select()
    .from(products)
    .where(
      eq(products.vendorId, vendorId)
    )
    .orderBy(
      desc(products.createdAt)
    );
};



// FIND ALL PRODUCTS

const findAll = async (
  query?:any
) => {

  return db
    .select()
    .from(products)
    .where(
      eq(products.isPublished, true)
    )
    .orderBy(
      desc(products.createdAt)
    );
};



// UPDATE PRODUCT

const update = async (
  id:string,
  data:any
) => {

  const [product] = await db
    .update(products)
    .set({
      ...data,
      updatedAt:new Date(),
    })
    .where(eq(products.id,id))
    .returning();


  return product;
};



// DELETE PRODUCT

const deleteProduct = async (
  id:string
) => {

  const [product] = await db
    .delete(products)
    .where(eq(products.id,id))
    .returning();


  return product;
};



// CREATE PRODUCT IMAGES

const createImages = async (
  productId:string,
  images:any[]
) => {

  return db
    .insert(productImages)
    .values(
      images.map((image)=>({
        productId,
        imageUrl:image.url,
        publicId:image.publicId,
      }))
    )
    .returning();
};



// GET PRODUCT IMAGES

const findImages = async (
  productId:string
) => {

  return db
    .select()
    .from(productImages)
    .where(
      eq(productImages.productId, productId)
    );
};



// DELETE IMAGE

const deleteImage = async (
  imageId:string
) => {

  const [image] = await db
    .delete(productImages)
    .where(
      eq(productImages.id,imageId)
    )
    .returning();


  return image;
};



// EXPORT

export const ProductsRepository = {

  findById,
  findByName,

  createProduct,

  findByVendor,
  findAll,

  update,
  delete: deleteProduct,

  createImages,
  findImages,
  deleteImage,

};