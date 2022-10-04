import { useSession } from "next-auth/react"
import PostsForm from "../components/PostsForm"
import Header from "../components/header"
import Meta from "../components/meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'
import EachPost from "../components/eachPost"


import { gql, GraphQLClient } from 'graphql-request';


export const getStaticProps = async (context) => {
    

    const query = gql`
    query MyQuery {
    posts (orderBy: updatedAt_DESC) {
      id
      body
      date
      userName
      location
      userInfo
    }
  }
`

    const graphQLClient = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)
    const data = await graphQLClient.request(query)
    return {
        props: {
            posts: data.posts
        },
        revalidate: 60,
    }
}









const MyPosts = ({ posts }) => {
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null

    const handleSubmit = (post) => {
        // setError(false);
        console.log("Button clicked")
    
        const router = useRouter()
        const userName = post.userName;
    
    
        const body = post.body;
        const date = post.date ? post.date : new Date().toISOString();
        let location = post.location ? post.location : "Unknown";
        let userInfo = post.userInfo ? post.userInfo : "Unknown";
    
        const commentObject = { body, userName }

        console.log(commentObject)
        // deleteComment(commentObject)
        //     .then((res) => {
        //         // setShowSuccessMessage(true);
        //         router.replace(router.asPath)
        //         setTimeout(() => {
        //             // setShowSuccessMessage(false);
        //         }, 3000);
        // })
    }
    

    return (
        <>
            <Meta />
            <Header />
            


            <div className="container px-2">

                <div className="flex flex-col items-center justify-center">
                {posts.map(post => (
                    loggedInUser == post.userName ? (
                        <EachPost key={post.id} post={post} />
                    ) : null
                ))} 
                </div>


            </div>

            <PostsForm session={session} />
       
        </>
    )
}

export default MyPosts