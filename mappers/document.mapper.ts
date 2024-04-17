import { Game2GuessDocument, PrismicDocumentResult } from "../models/document.models.ts";
import { encrypt } from "../services/encryption.service.ts";

export function mapPrismicResultToGameDocument(prismicResult: PrismicDocumentResult): Game2GuessDocument {
    const title = encrypt(prismicResult.data.title[0].text);
    const images: string[] = [];
    for (let i=1; i<=4; i++) {
        const image = Object.values(prismicResult.data)[i] as unknown as {url: string};
        images.push(image.url);
    }
    return {title, images};
}