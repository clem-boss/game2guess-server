import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'

const app = express();
const port = process.env.PORT || 3000

let ciphertext;

/*
Fetch the contents of the "message" textbox, and encode it
in a form we can use for the encrypt operation.
*/
function getMessageEncoding(message) {
  let enc = new TextEncoder();
  return enc.encode(message);
}
/*
Get the encoded message, encrypt it and display a representation
of the ciphertext in the "Ciphertext" element.
*/
async function encryptMessage(key) {
  let encoded = getMessageEncoding();
  ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    key.publicKey,
    encoded
  );

  let buffer = new Uint8Array(ciphertext, 0, 5);
  console.log(`${buffer}...[${ciphertext.byteLength} bytes total]`);
  return key;
}

/*
Fetch the ciphertext and decrypt it.
Write the decrypted message into the "Decrypted" box.
*/
async function decryptMessage(key) {
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    ciphertext
  );

  let dec = new TextDecoder();
  console.log(dec.decode(decrypted));
}

/*
Generate an encryption key pair, then set up event listeners
on the "Encrypt" and "Decrypt" buttons.
*/
async function generateKey() {
return window.crypto.subtle.generateKey(
  {
  name: "RSA-OAEP",
  // Consider using a 4096-bit key for systems that require long-term security
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"]
).then((keyPair) => {
  return keyPair;
});
}

async function encode() {
const key = await generateKey();
const cleanedData = await encryptMessage(key);
// await decryptMessage(cleanedData.privateKey);
 
return cleanedData;
}
// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
})

// Query for the root path.
app.get('/', async (req, res) => {
  // Here we are retrieving the first document from your API endpoint
  const document = await client.getFirst();
  res.send(encode(document.data.title[0].text));
  console.log(document.data.title[0].text);
})

// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})