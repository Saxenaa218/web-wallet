import crypto from "crypto";

const algorithm = "aes-256-cbc"; // Encryption algorithm
const ivLength = 16; // AES block size (128 bits = 16 bytes)

// Encrypts a given text with the provided secret key
export function encrypt(text: string, secretKey: string): string {
  const key = crypto
    .createHash("sha256")
    .update(secretKey)
    .digest("base64")
    .substr(0, 32); // Generate a 32-byte key
  const iv = crypto.randomBytes(ivLength); // Initialization vector

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`; // Return IV and encrypted data joined by a separator
}

// Decrypts an encrypted string using the provided secret key
export function decrypt(encryptedText: string, secretKey: string): string {
  const key = crypto
    .createHash("sha256")
    .update(secretKey)
    .digest("base64")
    .substr(0, 32); // Generate a 32-byte key
  const [ivHex, encrypted] = encryptedText.split(":"); // Split IV and encrypted text

  const iv = Buffer.from(ivHex, "hex"); // Convert IV back to binary
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
