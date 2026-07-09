import { uploadToCloudinary } from "../../utils/cloudinary";
import { VendorRepository } from "./vendors.repository";


/* ------------------------------ CREATE VENDOR ------------------------------ */

const createVendor = async ({
  userId,

  store_name,
  description,

  logo_buffer,
  banner_buffer,
  license_buffer,
}) => {
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

  return VendorRepository.create({
    userId,

    store_name,
    description,

    logo: logo.secure_url,
    banner: banner.secure_url,
    license: license.public_id,

    status: "pending",
  });
};

/* ----------------------------- GET MY VENDOR ------------------------------ */

const getMyVendor = async (userId: string) => {
  const vendor = await VendorRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

/* --------------------------- UPDATE MY VENDOR ----------------------------- */

const updateMyVendor = async ({
  userId,

  store_name,
  description,

  logo_buffer,
  banner_buffer,
  license_buffer,
}) => {
  const vendor = await VendorRepository.findByUserId(userId);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  const updates: any = {
    store_name,
    description,
  };

  if (logo_buffer) {
    const logo = await uploadToCloudinary(
      logo_buffer,
      `vendors/logo/${userId}`
    );

    updates.logo = logo.secure_url;
  }

  if (banner_buffer) {
    const banner = await uploadToCloudinary(
      banner_buffer,
      `vendors/banner/${userId}`
    );

    updates.banner = banner.secure_url;
  }

  if (license_buffer) {
    const license = await uploadToCloudinary(
      license_buffer,
      `vendors/license/${userId}`,
      {
        type: "private",
      }
    );

    updates.license = license.public_id;
  }

  return VendorRepository.update(vendor.id, updates);
};

/* ---------------------------- GET ALL VENDORS ----------------------------- */

const getAllVendors = async (query: any) => {
  return VendorRepository.findAll(query);
};

/* -------------------------- GET VENDOR BY SLUG ---------------------------- */

const getVendorBySlug = async (slug: string) => {
  const vendor = await VendorRepository.findBySlug(slug);

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  return vendor;
};

/* ---------------------------- APPROVE VENDOR ------------------------------ */

const approveVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "approved",
  });
};

/* ----------------------------- REJECT VENDOR ------------------------------ */

const rejectVendor = async (
  vendorId: string,
  reason: string
) => {
  return VendorRepository.update(vendorId, {
    status: "rejected",
    rejection_reason: reason,
  });
};

/* ---------------------------- SUSPEND VENDOR ------------------------------ */

const suspendVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "suspended",
  });
};

/* --------------------------- UNSUSPEND VENDOR ----------------------------- */

const unsuspendVendor = async (vendorId: string) => {
  return VendorRepository.update(vendorId, {
    status: "approved",
  });
};

/* -------------------------------- EXPORT --------------------------------- */

export const VendorService = {
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