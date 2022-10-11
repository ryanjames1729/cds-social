import { useSession } from "next-auth/react"
import PostsForm from "../components/PostsForm"
import Header from "../components/header"
import Meta from "../components/meta"
import { gql, GraphQLClient } from 'graphql-request';
import { useRouter } from 'next/router'
import useSWR from "swr";
import EachPost from "../components/eachPost"

// export const getStaticProps = async (context) => {    

//     const query = gql`
//     query MyQuery {
//     posts (orderBy: updatedAt_DESC, stage: DRAFT) {
//       id
//       body
//       date
//       userName
//       location
//       userInfo
//       documentInStages {
//         stage
//       }
//     }
//   }
// `
//     const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
//     const data = await graphQLClient.request(query)

//     return {
//         props: {
//             posts: data.posts
//         },
//         revalidate: 1,
//     }
// }

export async function getStaticProps() {
    const { getPosts } = require("../lib/helpers")
    return {
      props: (await getPosts()), revalidate: 1
    }
  }

export default function Admin (props) {
    // const { data: session } = useSession()

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data } = useSWR('/api', fetcher, {fallbackData: props, refreshInterval: 30000})
    let posts = data.posts
    const router = useRouter()

    // const loggedInUser = session?.user?.email.split("@")[0] || null

    
    
    

    return (
        <>
            <Meta />
            <Header />
            


            <div className="container px-2">

                <div className="flex flex-col items-center justify-center">
                {posts.map(post => (
                    <EachPost key={post.id} post={post} />
                ))} 
                </div>


            </div>

       
       
        </>
    )
}

