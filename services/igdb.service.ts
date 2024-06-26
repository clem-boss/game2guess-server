import fetch from "node-fetch";
import "dotenv/config";
import { IGDBGameResult, IGDBTokenResult } from "../models/igdb.models.ts";


const twitch = process.env.TWITCH_ID_DOMAIN || "";
const igdb = process.env.IGDB_DOMAIN || "";
const id = process.env.IGDB_CLIENT_ID || "";
const secret = process.env.IGDB_CLIENT_SECRET || "";

async function getIGDBToken(): Promise<IGDBTokenResult> {
    const headers = {
        "client_id": id,
        "client_secret": secret,
        "grant_type": "client_credentials"
    }

    const accessTokenRequest = {
        method: "POST",
        body: new URLSearchParams(headers),
    };

    const response = await fetch(`${twitch}oauth2/token`, accessTokenRequest);
    const token = await (response.json() as unknown as IGDBTokenResult);
    return token;
};

async function getIGDBGamesByName(name: string, token: string): Promise<IGDBGameResult[]> {
    const gameRequest = {
        method: 'POST',
        headers: {
            'Client-ID': "jwz94hqz4avlwtjqyn7y11fuqbfln4",
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        },
        body: `fields name, slug; search "${name}"; where version_parent = null;  limit 5;`
    }
    const response = await fetch(`${igdb}v4/games/`, gameRequest);
    const games = await (response.json() as unknown as IGDBGameResult[]);
    return games;
};

export {getIGDBToken, getIGDBGamesByName}