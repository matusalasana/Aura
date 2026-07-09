import { Request, Response, NextFunction } from "express";
import { VendorsService } from "./vendors.service";


// CREATE VENDOR
const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as any;

    const vendor = await VendorsService.createVendor({
      userId: req.user?.userId,

      body: req.body,

      logo_buffer: files?.logo?.[0]?.buffer,
      banner_buffer: files?.banner?.[0]?.buffer,
      license_buffer: files?.license?.[0]?.buffer,
    });

    return res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET MY VENDOR
const getMyVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.getMyVendor(req.user?.userId);

    return res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// UPDATE MY VENDOR
const updateMyVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const vendor = await VendorsService.updateMyVendor({
        userId: req.user?.userId,
        body: req.body,
      });

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET ALL VENDORS
const getAllVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendors = await VendorsService.getAllVendors(req.query);

    return res.status(200).json({
      success: true,
      vendors,
    });
  } catch (error: any) {
    next(error);
  }
};

// GET VENDOR BY SLUG
const getVendorBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.getVendorBySlug(req.params.slug);

    return res.status(200).json({
      success: true,
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// APPROVE VENDOR
const approveVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.approveVendor(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vendor approved successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// REJECT VENDOR
const rejectVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.rejectVendor(
      req.params.id,
      req.body.reason
    );

    return res.status(200).json({
      success: true,
      message: "Vendor rejected successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// SUSPEND VENDOR
const suspendVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.suspendVendor(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vendor suspended successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// UNSUSPEND VENDOR
const unsuspendVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vendor = await VendorsService.unsuspendVendor(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vendor unsuspended successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

// UPDATE VENDOR PROFILE 
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const updated = await VendorsService.updateProfile({
      userId: req.user.userId,
      body: req.body
    });
    
    res.status(200).json({
      success: true,
      updated
    });
  }catch (error: any) {
    next(error);
  }
};

// UPLOAD LOGO 
const uploadLogo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { message } = await VendorsService.uploadLogo({
      userId: req.user.userId,
      logo_buffer: req.file?.buffer,
    });
    
    res.status(200).json({
      success: true,
      message
    });
  }catch (error: any) {
    next(error);
  }
};

// UPLOAD BANNER 
const uploadBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { message } = await VendorsService.uploadBanner({
      userId: req.user.userId,
      banner_buffer: req.file?.buffer,
    });
    
    res.status(200).json({
      success: true,
      message
    });
  }catch (error: any) {
    next(error);
  }
};

// UPLOAD LICENSE 
const uploadLicense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { message } = await VendorsService.uploadLicense({
      userId: req.user.userId,
      license_buffer: req.file?.buffer,
    });
    
    res.status(200).json({
      success: true,
      message
    });
  }catch (error: any) {
    next(error);
  }
};



export const VendorsController = {
  createVendor,

  getMyVendor,
  updateMyVendor,
  
  updateProfile,
  
  uploadLogo,
  uploadBanner,
  uploadLicense,

  getAllVendors,
  getVendorBySlug,

  approveVendor,
  rejectVendor,
  suspendVendor,
  unsuspendVendor,
};