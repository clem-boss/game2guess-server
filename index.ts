import bodyParser from "body-parser";
import express, { Express } from "express";
import { getDocument } from "./services/prismic-document.service.ts";
import { getIGDBGamesByName, getIGDBToken } from "./services/igdb.service.ts";
import "dotenv/config";
import { IGDBTokenResult } from "./models/igdb.models.ts";
import { Game2GuessDocument } from "./models/document.models.ts";
import cors from "cors";



const app: Express = express();
const port = process.env.PORT || 3000;

let gameDocument: Game2GuessDocument;
let IGDBtoken: string;

getIGDBToken()
  .then((response: IGDBTokenResult) => {
    IGDBtoken = response.access_token;
  })

getDocument()
  .then((response: Game2GuessDocument) => {
      gameDocument = response;
  });

app.use(cors());

app.use(bodyParser.text())

app.get("/", async (req, res) => {
  res.send("Hello from express !");
})

app.get("/document", async (req, res) => {
  res.send(gameDocument);
})

app.post("/igdb", (req, res) => {
    const searchName = req.body;
    getIGDBGamesByName(searchName, IGDBtoken).then(response => res.send(response));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})