import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'
import crypto from 'crypto'
import {encrypt, decrypt} from './encrypt.cjs'
import cors from 'cors'
import cors_proxy from 'cors-anywhere'
import axios from 'axios';
import requestIp from 'request-ip'
import { networkInterfaces } from 'os'



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

app.use(cors({
  origin: ['http://localhost:3001', 'https://clemboss.site']
}));

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

function getLocalIp() {
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
}
await getLocalIp();

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || results['eth0'][0];
// Listen on a specific port via the PORT environment variable

// Query for the root path.
app.get('/title', async (req, res) => {
  res.send(hash);
})

app.get('/', async (req, res) => {
  res.send(results);
})

app.get('/images', async (req, res) => {
  let array = []
  array.push(document.data.img1);
  array.push(document.data.img2);
  array.push(document.data.img3);
  array.push(document.data.img4);

  res.send(array);

})

/* cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});

const access_token = await axios.post('https://id.twitch.tv/oauth2/token?client_id=jwz94hqz4avlwtjqyn7y11fuqbfln4&client_secret=ziazxnfp8v0nqr1qqsxugrlv6eofe2&grant_type=client_credentials')
.then(function (response) {
  return response.data.access_token;
})
  .catch(function (error) {
    console.log(error);
  })

  console.log(access_token);



  app.get('/igdb/:igdbTitle', (req, res) => {
    axios.post('https://id.twitch.tv/oauth2/token?client_id=jwz94hqz4avlwtjqyn7y11fuqbfln4&client_secret=ziazxnfp8v0nqr1qqsxugrlv6eofe2&grant_type=client_credentials')
    .then(function (response) {
      return axios({
        url: "https://api.igdb.com/v4/games/",
        method: 'POST',
        headers: {
            'Client-ID': "jwz94hqz4avlwtjqyn7y11fuqbfln4",
            'Authorization': "Bearer "+ access_token,
            'Content-Type': 'text/plain'
        },
        data: 'fields name; where name = "'+ req.params.igdbTitle + '"*;'
      })
        .then(response => {
           res.send(response.data);
        })
        .catch(err => {
            console.error(err);
        });
  });
})  */
/* axios.post('https://id.twitch.tv/oauth2/token?client_id=jwz94hqz4avlwtjqyn7y11fuqbfln4&client_secret=ziazxnfp8v0nqr1qqsxugrlv6eofe2&grant_type=client_credentials')
      .then(function (response) {
        axios({
          url: "https://api.igdb.com/v4/games",
          method: 'POST',
          headers: {
              'Client-ID': "jwz94hqz4avlwtjqyn7y11fuqbfln4",
              'Authorization': "Bearer "+response.data.access_token,
              'Content-Type': 'text/plain'
          },
          data: "fields *;"
        })
          .then(response => {
              console.log(response.data);
          })
          .catch(err => {
              console.error(err);
          });
      })
      .catch(function (error) {
        console.log(error);
      }) */


// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})