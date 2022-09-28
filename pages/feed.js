import { useSession } from "next-auth/react"
import PostsForm from "../components/PostsForm"
import Header from "../components/header"

import { gql, GraphQLClient } from 'graphql-request';


export const getStaticProps = async (context) => {
    

    const query = gql`
    query MyQuery {
    posts {
      id
      body
      date
      userName
    }
  }
`

    const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
    const data = await graphQLClient.request(query)
    return {
        props: {
            posts: data.posts
        }
    }
}





export default function Feed ({ posts }) {
    const { data: session } = useSession()
    

    return (
        <>
            <Header />
            <div className="container">
                {posts.map(post => (
                    
                    <div key={post.id} className="py-4">
                        <h1>{post.body}</h1>
                        <p>{post.date.split("T")[0]}</p>
                        <p>{post.userName}</p>
                    </div>
            
                ))}    
            </div>

           
       
        </>
    )
}