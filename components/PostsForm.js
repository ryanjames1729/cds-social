import React, { useRef, useState, useEffect } from 'react'
import { submitComment } from '../services'
import { useRouter } from 'next/router'




const PostsForm = ({ session }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const nameEl = useRef();
    const emailEl = useRef();
    const storeDataEl = useRef();
    const router = useRouter()
    

    const handleSubmit = event => {
        event.currentTarget.disabled = true;

        setError(false);

        const { value: commentBody } = commentEl.current;
        const userName = 'anonymous';

        if(session) {
            
            userName = session.user.email.split("@")[0];
        } 
        if(!commentBody || !userName) {
            setError(true);
            return;
        }

        const body = commentBody;
        const date = new Date().toISOString();
        let location = 'unknown';
        let userInfo = navigator.userAgent;

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                location = position.coords.latitude + ',' + position.coords.longitude;
            });
        }
    
        const commentObject = { body, date, location, userName, userInfo }
        submitComment(commentObject)
            .then((res) => {
                setShowSuccessMessage(true);
                router.replace(router.asPath)
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
                event.currentTarget.disabled = false;
        })
    }

    return (
        <div className="flex flex-col items-center justify-center">
        <div className="py-4 -ml-8 rounded-lg shadow-lg border-black w-1/2">
            <h1 className="text-3xl">{session ? session.user.email.split("@")[0] : "anonymous"}, what&apos;s your thoughts?</h1>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea ref={commentEl} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-slate-300 dark:bg-gray-200 dark:text-black" 
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            {/* <div className="grid grid-cols-1 gap-4 mb-4">
                <input 
                    type="text" ref={nameEl}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
                    placeholder="Name"
                    name="name"
                />
            </div> */}
            <div className="grid grid-cols-1 gap-4 mb-4">

            </div>
            {error && <p className="text-xs test-red-500">All fields are required.</p>}
            <div className="mt-8 rounded-lg w-1/3 hover:cursor-pointer">
                <button type="button" onClick={handleSubmit} className="w-36 p-2 rounded-lg bg-cyan-700 hover:bg-cyan-800 hover:underline disabled:opacity-50">Post My Comment</button>
                {showSuccessMessage && <span className="bg-orange-500 rounded-md background"><br/>Comment submitted for review.</span>}
            </div>
        </div>
        </div>
    )

}

export default PostsForm