import crypto from "crypto";

export const generateSKU = (prefix = "PROD", color, size) => {
  const random = crypto
    .randomBytes(4)
    .toUpperCase();
A1B2C3D4
  return `${prefix}-${random}`;
};