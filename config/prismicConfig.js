// node-fetch is used to make network requests to the Prismic Rest API. 
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'

const repoName = 'game2guess' // Fill in your repository name.
const accessToken = 'MC5ZazNvcHhNQUFDTUEtbnB1.ShRIO1s-77-9NE8B77-977-9ASnvv71l77-9Rjvvv73vv70_77-977-977-977-9Tu-_ve-_ve-_vT7vv70' // If your repo is private, add an access token.

// The `routes` property is your Route Resolver. It defines how you will 
// structure URLs in your project. Update the types to match the Custom 
// Types in your project, and edit the paths to match the routing in your 
// project.
const routes = [
  {
    type: 'game',
    path: '/',
  },
]

export const client = prismic.createClient(repoName, { 
  fetch, 
  accessToken,
  routes,
})