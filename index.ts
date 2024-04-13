import * as prismicHelpers from "@prismicio/helpers";
import cors from "cors";
import { CryptoValue } from "./models/crypto.models";
import express, { Express, Response } from "express";
import { getDocument } from "./services/prismic-document.service";
import { getIGDBGamesByName, getIGDBToken } from "./services/igdb.service";
import "dotenv/config";
import { IGDBTokenResult } from "./models/igdb.models";



const app: Express = express();
const port = process.env.PORT || 3000;

let hashedGameTitle: CryptoValue;
let gameImages: string[];
let IGDBtoken: string;

getIGDBToken()
  .then((response: IGDBTokenResult) => {
    IGDBtoken = response.access_token;
  })

getDocument()
  .then(document => {
      hashedGameTitle = document.title;
      gameImages = document.images;
  });

app.use((req, res: Response, next) => {
  res.locals.ctx = {
    prismicH: prismicHelpers,
  };
  next();
});

app.use(cors({origin: process.env.ALLOWED_DOMAINS}));

app.get("/", async (req, res) => {
  res.send("Hello from express !");
})

app.get("/title", async (req, res) => {
  res.send(hashedGameTitle);
})

app.get("/images", async (req, res) => {
  res.send(gameImages);
})

app.get("/igdb/:igdbTitle", (req, res) => {
    const searchName = req.params.igdbTitle;
    getIGDBGamesByName(searchName, IGDBtoken).then(response => res.send(response));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})