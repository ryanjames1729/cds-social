import { useSession } from "next-auth/react"
import PostsForm from "../components/PostsForm"
import Header from "../components/header"
import Meta from "../components/meta"
import { useRouter } from 'next/router'
import { deleteComment } from '../services'

const EachPost = ({ post }) => {
    const { data: session } = useSession()
    const loggedInUser = session?.user?.email.split("@")[0] || null
    const router = useRouter()

    console.log(post)

    const handleSubmit = () => {
        // setError(false);
        console.log("Button clicked")
    
        
        const userName = post.userName;

        
    
    
        const body = post.body;
        const date = post.date ? post.date : new Date().toISOString();
        let location = post.location ? post.location : "Unknown";
        let userInfo = post.userInfo ? post.userInfo : "Unknown";
    
        const commentObject = { body, userName }

        console.log(commentObject)
        deleteComment(commentObject)
            .then((res) => {
                // setShowSuccessMessage(true);
                router.replace(router.asPath)
                setTimeout(() => {
                    // setShowSuccessMessage(false);
                }, 3000);
        })
    }

    return (
        <div key={post.id} className="w-1/2 lg:flex py-6">
                <div className="pt-10 border-l border-gray-400 border-t border-b h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <h2 className="text-8xl">{post.userName.substring(0,2).toUpperCase()}</h2>
                </div>
                <div className="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8 w-96">
                    <p className="text-sm text-gray-600 flex items-center">
                        <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                        </svg>
                        Subscriptions Only
                    </p>
                    <div className="text-gray-900 font-bold text-xl mb-2">New Post by {post.userName}</div>
                    <p className="text-gray-700 text-base">{post.body}</p>
                    </div>
                    <div className="flex items-center">
                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">{post.userName}</p>
                        <p className="text-gray-600">{post.date.split("T")[0]}</p>
                        <p className="text-gray-600">Location: {post.location}</p>
                        <p className="text-gray-600">Info: {post.userInfo}</p>
                        <div className="grid grid-cols-3 content-end">
                            <div></div>
                            <div></div>
                            {post.documentInStages && post.documentInStages.length > 0 ? (
                                <button type="button" onClick={handleSubmit} className="w-18 p-2 rounded-lg bg-red-600 hover:bg-red-800 hover:underline">Delete this post</button>
                            ): null}
                        </div>
                    </div>
                    </div>
                </div>
                    
                </div>    
    )
}

export default EachPost