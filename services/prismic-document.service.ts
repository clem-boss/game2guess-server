import { mapPrismicResultToGameDocument } from '../mappers/document.mapper.ts';
import { Game2GuessDocument, PrismicDocumentResult } from '../models/document.models.ts';
import { client } from '../prismic.config.ts';

async function getDocument(): Promise<Game2GuessDocument> {
    const document = await client.getFirst();
    const mappedDocument = mapPrismicResultToGameDocument(document as unknown as PrismicDocumentResult);
    return mappedDocument;
}

export { getDocument };