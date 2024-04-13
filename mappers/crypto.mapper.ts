import { CryptoValue } from "../models/crypto.models";

export function mapBufferToCryptoValue(randomBuffer: Buffer, dataBuffer: Buffer): CryptoValue {
    return {
        key: randomBuffer.toString("hex"),
        encryptedValue: dataBuffer.toString("hex"),
    }
};