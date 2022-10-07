import { gql, GraphQLClient } from 'graphql-request';

export async function getPosts(){

    const query = gql`
        query MyQuery {
            posts (orderBy: updatedAt_DESC) {
                id
                body
                date
                userName
                location
                userInfo
                documentInStages {
                  stage
                }
            }
        }
    `

    const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
    let data = await graphQLClient.request(query)
    return {posts: data.posts}
}