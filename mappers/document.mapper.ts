import { Game2GuessDocument, PrismicDocumentResult } from "../models/document.models";
import { encrypt } from "../services/encryption.service";

export function mapPrismicResultToGameDocument(prismicResult: PrismicDocumentResult): Game2GuessDocument {
    const title = encrypt(prismicResult.data.title[0].text);
    const images: string[] = [];
    for (let i=1; i<=4; i++) {
        images.push(prismicResult.data[`img${i}`as keyof object]);
    }
    return {title, images};
}