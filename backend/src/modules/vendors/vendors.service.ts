import { uploadToCloudinary } from "../../utils/cloudinary";
import { VendorRepository } from "./vendors.repository";


// CREATE VENDOR
const createVendor = async ({
  userId,

  body,

  logo_buffer,
  banner_buffer,
  license_buffer,
}) => {
  const {
    store_name,
    description,
    payout_email,
    tin_number,
  } = body;
  
  const existing = await VendorRepository.findByUserId(userId);

  if (existing) {
    throw new Error("Vendor already exists");
  }

  const [logo, banner, license] = await Promise.all([
    uploadToCloudinary(logo_buffer, `vendors/logo/${userId}`),
    uploadToCloudinary(banner_buffer, `vendors/banner/${userId}`),
    uploadToCloudinary(
      license_buffer,
      `vendors/license/${userId}`,
      {
        type: "private",
      }
    ),
  ]);

  return VendorRepository.createVendor({
    userId,

    storeName: store_name,
    payoutEmail: payout_email,
    tinNumber: tin_number,
    description,
    

    logoUrl: logo.secure_url,
    bannerUrl: banner.secure_url,
    licensePublicId: license.public_id,

    status: "pending",
  });
};

// GET MY VENDOR
const getMyVendor = async (userId: string) => {
  const vendor = await VendorRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

// UPDATE MY VENDOR
const updateMyVendor = async ({
  userId,
  body
}) => {
  const {
    store_name,
    description,
    payout_email,
    tin_number,
  } = body;
  
  const vendor = await VendorRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const data = {};
  
  if(store_name !== undefined){
    data.storeName = store_name;
  }
  
  if(description !== undefined){
    data.description = description;
  }
  
  if(payout_email !== undefined){
    data.payoutEmail = payout_email;
  }

  return VendorRepository.update({
    id:vendor.id, 
    data
  });
};

// GET ALL VENDORS

const getAllVendors = async (query: any) => {
  return VendorRepository.findAll(query);
};

// GET VENDOR BY SLUG

const getVendorBySlug = async (slug: string) => {
  const vendor = await VendorRepository.findBySlug(slug);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

// APPROVE VENDOR

const approveVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "approved",
  });
};

// REJECT VENDOR

const rejectVendor = async (
  vendorId: string,
  reason: string
) => {
  return VendorRepository.update(vendorId, {
    status: "rejected",
    rejection_reason: reason,
  });
};

// SUSPEND VENDOR

const suspendVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "suspended",
  });
};

// UNSUSPEND VENDOR

const unsuspendVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "approved",
  });
};

// EXPORT

export const VendorsService = {
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