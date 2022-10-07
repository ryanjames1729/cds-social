// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Any file inside the folder pages/api is mapped to the route /api/<filename>
// will be treated as an endpoint and not a page

import { GraphQLClient, gql } from "graphql-request"
// import { ProfanityEngine } from '@coffeeandfun/google-profanity-words'
import bannedWords from '../../bannedWords.json'

const graphqlAPI = process.env.HYGRAPH_ENDPOINT
const graphcmsToken = process.env.HYGRAPH_TOKEN



export default async function handler(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    }
  })

  let comment = req.body.body.split(" ")
  // let profanity = new ProfanityEngine()
  let goodComment = true
  // for(let i = 0; i < comment.length; i++){
  //   if(profanity.search(comment[i])){
  //     goodComment = false
  //   }
  // }
  for(let i = 0; i < comment.length; i++){
    if(bannedWords.includes(comment[i])){
      goodComment = false
    }
  }

  const query = goodComment ? gql`
    mutation createPost($body: String!, $date: String!, $location: String!, $userName: String!, $userInfo: String!) {
      createPost(data: {body: $body, date: $date, location: $location, userName: $userName, userInfo: $userInfo}) { id }
      publishManyPosts(where: {body: $body, userName: $userName}) { count }
    }
  ` : gql`
  mutation CreatePost($body: String!, $date: String!, $location: String!, $userName: String!, userInfo: String!) {
    createPost(data: { body: $body, date: $date, location: $location, userName: $userName, userInfo: $userInfo }) { id }
  }
`
  try{
    console.log(req.body)
    
    const result = await graphQLClient.request(query, req.body)

    res.status(200).send(result);
    

  } catch (error) {
    console.log(error)
  }

  
}
