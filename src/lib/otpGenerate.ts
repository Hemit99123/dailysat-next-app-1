import crypto from "crypto";

const otpGenerate = (length: number): string => {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?"; // Complex charset
  const charsetLength = charset.length;

  // Generate secure random bytes
  const randomBytes = crypto.randomBytes(length);

  // Map random bytes to characters in the charset
  const otp = Array.from(randomBytes)
    .map((byte) => charset[byte % charsetLength])
    .join("");

  return otp;
};

export default otpGenerate;
