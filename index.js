import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'
import crypto from 'crypto'
import {encrypt, decrypt} from './encrypt.cjs'

const document = await client.getFirst();
const text = document.data.title[0].text;

const hash = encrypt(text);

console.log(hash);

// const text = decrypt(hash);

// console.log(text); // Hello World!

const app = express();
const port = process.env.PORT || 3000


app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
})

// Query for the root path.
app.get('/title', async (req, res) => {
  res.send(hash);
})

app.get('/', async (req, res) => {
  res.send("buenos dias");
})

app.get('/images', async (req, res) => {
  let array = []
  array.push(document.data.img1);
  array.push(document.data.img2);
  array.push(document.data.img3);
  array.push(document.data.img4);

  res.send(array);

})

// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})