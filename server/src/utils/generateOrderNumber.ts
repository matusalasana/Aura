import crypto from "node:crypto";

export const generateOrderNumber = () => {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const random = crypto.randomBytes(4).toString("hex").toUpperCase();

  return `ORD-${date}-${random}`;
};