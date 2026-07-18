import { Request, Response, NextFunction } from "express";
import { ProductsService } from "./products.service";

// CREATE PRODUCT
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as any;

    const product = await ProductsService.createProduct({
      userId: req.user.userId,
      body: req.body,
      thumbnail_buffer: files?.thumbnail?.[0]?.buffer,
      image_buffers: files?.images?.map((file: Express.Multer.File) => file.buffer),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET MY PRODUCTS
const getMyProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductsService.getMyProducts({
      userId: req.user.userId,
      query: req.query,
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET PRODUCT BY ID
const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductsService.getProductById(req.params.id);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET ALL PRODUCTS
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductsService.getAllProducts(req.query);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error: any) {
    next(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductsService.updateProduct({
      productId: req.params.id,
      userId: req.user.userId,
      body: req.body,
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error: any) {
    next(error);
  }
};

// DELETE PRODUCT
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductsService.deleteProduct({
      productId: req.params.id,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: any) {
    next(error);
  }
};

// UPLOAD THUMBNAIL
const uploadThumbnail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = await ProductsService.uploadThumbnail({
      productId: req.params.id,
      userId: req.user.userId,
      thumbnail_buffer: req.file?.buffer,
    });

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error: any) {
    next(error);
  }
};

// UPLOAD PRODUCT IMAGES
const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as Express.Multer.File[];

    const images = await ProductsService.uploadImages({
      productId: req.params.id,
      userId: req.user.userId,
      image_buffers: files.map((file) => file.buffer),
    });

    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully.",
      images,
    });
  } catch (error: any) {
    next(error);
  }
};

// DELETE PRODUCT IMAGE
const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductsService.deleteImage({
      productId: req.params.id,
      imageId: req.params.imageId,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error: any) {
    next(error);
  }
};

// PUBLISH PRODUCT
const publishProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductsService.publishProduct({
      productId: req.params.id,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Product published successfully.",
      product,
    });
  } catch (error: any) {
    next(error);
  }
};

// UNPUBLISH PRODUCT
const unpublishProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await ProductsService.unpublishProduct({
      productId: req.params.id,
      userId: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Product unpublished successfully.",
      product,
    });
  } catch (error: any) {
    next(error);
  }
};

export const ProductsController = {
  createProduct,

  getMyProducts,
  getProductById,
  getAllProducts,

  updateProduct,
  deleteProduct,

  uploadThumbnail,
  uploadImages,
  deleteImage,

  publishProduct,
  unpublishProduct,
};