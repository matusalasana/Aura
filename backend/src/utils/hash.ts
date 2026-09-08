import bcrypt from "bcryptjs";


// Hash otp
const hashOTP = async (otp: string) => {
  const salt = 10;
  return await bcrypt.hash(otp, salt);
};

// Compare otp
const compareOTP = async ({otp, hashedOTP}: {
  otp: string;
  hashedOTP: string;
}) => {
  return await bcrypt.compare(otp, hashedOTP);
};




export const HashUtils = {
  hashOTP,
  compareOTP
}