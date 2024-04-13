
import "dotenv/config";
import fetch from "node-fetch";
import * as prismic from "@prismicio/client";

const repoName = process.env.PRISMIC_REPO || "";
const accessToken = process.env.PRISMIC_TOKEN || "";

const routes = [
  {
    type: "game",
    path: "/",
  },
]

export const client = prismic.createClient(repoName, { 
  fetch, 
  accessToken,
  routes,
});