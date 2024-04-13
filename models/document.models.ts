import { CryptoValue } from "./crypto.models";

export interface Game2GuessDocument {
    title: CryptoValue;
    images: string[];
};

export interface PrismicDocumentResult {
    data: {
        title: [
            {
                text: string;
            }
        ],
        img1: string;
        img2: string;
        img3: string;
        img4: string;
    }
}