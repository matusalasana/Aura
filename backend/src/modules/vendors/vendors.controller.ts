import { Request, Response, NextFunction } from "express";
import { VendorService } from "./vendors.service";

// CREATE VENDOR
const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files as any;

    const vendor = await VendorService.createVendor({
      userId: req.user.id,

      ...req.body,

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
    const vendor = await VendorService.getMyVendor(req.user.id);

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
    const files = req.files as any;

    const vendor = await VendorService.updateMyVendor({
      userId: req.user.id,

      ...req.body,

      logo_buffer: files?.logo?.[0]?.buffer,
      banner_buffer: files?.banner?.[0]?.buffer,
      license_buffer: files?.license?.[0]?.buffer,
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
    const vendors = await VendorService.getAllVendors(req.query);

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
    const vendor = await VendorService.getVendorBySlug(req.params.slug);

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
    const vendor = await VendorService.approveVendor(req.params.id);

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
    const vendor = await VendorService.rejectVendor(
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
    const vendor = await VendorService.suspendVendor(req.params.id);

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
    const vendor = await VendorService.unsuspendVendor(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Vendor unsuspended successfully.",
      vendor,
    });
  } catch (error: any) {
    next(error);
  }
};

export const VendorController = {
  createVendor,

  getMyVendor,
  updateMyVendor,

  getAllVendors,
  getVendorBySlug,

  approveVendor,
  rejectVendor,
  suspendVendor,
  unsuspendVendor,
};