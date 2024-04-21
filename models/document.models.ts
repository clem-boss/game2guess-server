import { CryptoValue } from "./crypto.models.ts";

export interface Game2GuessDocument {
    title: string;
    images: string[];
};

export interface PrismicDocumentResult {
    data: {
        title: [
            {
                text: string;
            }
        ],
        img1: {
            src: string;
        };
        img2: {
            src: string;
        };
        img3: {
            src: string;
        };
        img4: {
            src: string;
        };
    }
}