import { createCipheriv, randomBytes } from "crypto";
import { CryptoValue } from "../models/crypto.models.ts";
import { mapBufferToCryptoValue } from "../mappers/crypto.mapper.ts";
import "dotenv/config";

const algorithm = "aes-256-ctr";
const secretKey = process.env.CRYPTO_SECRET_KEY || "";
const buffer = randomBytes(16);

export function encrypt(text: string): CryptoValue {
    const cipher = createCipheriv(algorithm, secretKey, buffer);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return mapBufferToCryptoValue(buffer, encrypted);
};