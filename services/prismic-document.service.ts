import { mapPrismicResultToGameDocument } from '../mappers/document.mapper';
import { Game2GuessDocument, PrismicDocumentResult } from '../models/document.models';
import { client } from '../prismic.config';

export async function getDocument(): Promise<Game2GuessDocument> {
    const document = await client.getFirst();
    const mappedDocument = mapPrismicResultToGameDocument(document as unknown as PrismicDocumentResult);
    return mappedDocument;
}