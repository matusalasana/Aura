
import { Request, Response } from "express";
import { productsService } from "./products.service";

export const getProducts = async (req: Request, res: Response) => {
  const products = await productsService.getProducts();

  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await productsService.getProduct(id);

  res.status(200).json(product);
};

// export const getProduct = async (req, res) => {
//   try{
//     const id = req.params.id;
//     const product = await getProductService(id: string);
//     return res.status(200).json(product);
//   }catch(error){
//     console.log("Error getting product:", error.message)
//     return res.status(400).json({message: error.message})
//   }
// };

// export const addProduct = async (req, res) => {
//   try{
//     const data = req.body;
//     const newProduct = await addProductService(data);
//     return res.status(201).json(newProduct);
//   }catch(error){
//     console.log("Error adding product:", error.message)
//     return res.status(400).json({message: error.message})
//   }
// };

// export const updateProduct = async (req, res) => {
//   try{
//     const id = req.params.id;
//     const updatedProduct = await updateProductService(id: string);
//     return res.status(200).json(updatedProduct);
//   }catch(error){
//     console.log("Error updating product:", error.message)
//     return res.status(400).json({message: error.message})
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try{
//     const id = req.params.id;
//     const isProductDeleted = await deleteProductService(id: string);
//     return res.status(200).json({message: "Product deleted"});
//   }catch(error){
//     console.log("Error deleting product:", error.message)
//     return res.status(400).json({message: error.message})
//   }
// };