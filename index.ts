import bodyParser from "body-parser";
import express, { Express, Response, response } from "express";
import { getDocument } from "./services/prismic-document.service";
import { getIGDBGamesByName, getIGDBToken } from "./services/igdb.service";
import "dotenv/config";
import { IGDBTokenResult } from "./models/igdb.models";
import { Game2GuessDocument } from "./models/document.models";



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

// app.use(cors({origin: process.env.ALLOWED_DOMAINS}));
app.use(bodyParser.text())

app.get("/", async (req, res) => {
  res.send("Hello from express !");
})

app.get("/document", async (req, res) => {
  res.send(gameDocument);
})

app.get("/igdb", (req, res) => {
    const searchName = req.body;
    getIGDBGamesByName(searchName, IGDBtoken).then(response => res.send(response));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})