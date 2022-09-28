import { getProviders, signIn, signOut, useSession, getCsrfToken } from "next-auth/react"
import React from "react"
import Header from "../../components/header"


export default function SignIn({ providers, csrfToken }) {
  const { data: session } = useSession()
  const path = session ? "Login" : "Logout"

  if(session) {
    return (
        <>
         <Header />
        <div className="flex flex-row h-screen">
          <div className="flex flex-col w-full px-96 mt-20">
            <div className="flex flex-col items-center border-2 border-solid rounded-lg border-stone-800 dark:border-white rounded-lg p-4">
              <div className="">
                Signed in as {session.user.email}
              </div>
              <div className="mt-4 p-1 border-2 border-solid rounded-xl dark:border-white dark:bg-slate-700 dark:hover:bg-slate-800 bg-cyan-700 text-white hover:bg-cyan-800">
                <button onClick={() => signOut()}>SIGN OUT</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
  }
  return (
    <>
   <Header />
    <div className="flex flex-row h-screen">
          <div className="flex flex-col px-16 lg:w-full px-2 lg:px-96 mt-20">
            <div className="flex flex-col items-center border-2 border-solid rounded-lg border-stone-800 dark:border-white rounded-lg p-4">
              <div className="text-center">
                Woops! You're not signed in.<br/>Sign in below to post comments.
              </div>
              <div className="mt-4 p-2">
                {Object.values(providers).map((provider) => (
                    <div key={provider.name} className="p-1 mt-1 mb-1 border-2 border-solid rounded-xl dark:border-white dark:bg-slate-700 dark:hover:bg-slate-800 bg-cyan-700 text-white hover:bg-cyan-800">
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}
                        </button>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken()
  return {
    props: { providers, csrfToken },
  }
}