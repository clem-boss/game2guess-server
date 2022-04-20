import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'
import crypto from 'crypto'
import {encrypt, decrypt} from './encrypt.cjs'

const hash = encrypt('Hello World!');

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
app.get('/', async (req, res) => {
  res.send(hash);
})


app.get('/deciphered', async (req, res) => {
  var crypto = require('crypto');
  var mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
  var mystr = mykey.update('34feb914c099df25794bf9ccb85bea72', 'hex', 'utf8')
  mystr += mykey.final('utf8');

  console.log(mystr); //abc

})

// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})