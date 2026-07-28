import { uploadToCloudinary } from "../../utils/cloudinary";
import { VendorsRepository } from "./vendors.repository";
import { createVendorSchema } from "./vendors.validation"


// CREATE VENDOR
const createVendor = async ({
  userId,

  body,

  logo_buffer,
  banner_buffer,
  license_buffer,
}) => {
  
  const validated = createVendorSchema.parse(body)
  
  const {
    store_name,
    description,
    payout_email,
    tin_number,
  } = validated;
  
  console.log("The validated data is:", validated)
  
  const existing = await VendorsRepository.findByUserId(userId);

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

  return VendorsRepository.createVendor({
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
const getCurrentVendor = async (userId: string) => {
  const vendor = await VendorsRepository.findByUserId(userId);

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
  
  const vendor = await VendorsRepository.findByUserId(userId);

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

  return VendorsRepository.update({
    id:vendor.id, 
    data
  });
};

// GET ALL VENDORS

const getAllVendors = async (query: any) => {
  return VendorsRepository.findAll(query);
};

// GET VENDOR BY SLUG

const getVendorBySlug = async (slug: string) => {
  const vendor = await VendorsRepository.findBySlug(slug);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

// APPROVE VENDOR

const approveVendor = async (vendorId: string) => {
  return VendorsRepository.update(vendorId, {
    status: "approved",
  });
};

// REJECT VENDOR

const rejectVendor = async (
  vendorId: string,
  reason: string
) => {
  return VendorsRepository.update(vendorId, {
    status: "rejected",
    rejection_reason: reason,
  });
};

// SUSPEND VENDOR

const suspendVendor = async (vendorId: string) => {
  return VendorsRepository.update(vendorId, {
    status: "suspended",
  });
};

// UNSUSPEND VENDOR

const unsuspendVendor = async (vendorId: string) => {
  return VendorsRepository.update(vendorId, {
    status: "approved",
  });
};

// UPLOAD LOGO 
const uploadLogo = async ({
  userId,
  logo_buffer
}) => {
  
  if(!userId) throw new Error("User id not found");
  
  if(!logo_buffer) throw new Error("Logo is required")
  
  await uploadToCloudinary(logo_buffer, `vendors/logo/${userId}`),
  
  await VendorsRepository.uploadLogo(vendorId);
};


// EXPORT
export const VendorsService = {
  createVendor,

  getCurrentVendor,
  updateMyVendor,
  
  uploadLogo,

  getAllVendors,
  getVendorBySlug,

  approveVendor,
  rejectVendor,
  suspendVendor,
  unsuspendVendor,
};