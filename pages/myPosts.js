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





export default function MyPosts ({ posts }) {
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null

    return (
        <>
            <Header />
            <div className="container">
                {posts.map(post => (
                    loggedInUser == post.userName ? (
                        <div key={post.id} className="py-4">
                        <h1>{post.body}</h1>
                        <p>{post.date.split("T")[0]}</p>
                        <p>{post.userName}</p>
                    </div>
                    ) : null
                ))}    
            </div>

            <PostsForm session={session} />
       
        </>
    )
}