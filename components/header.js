import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { server } from '../config'

const Header = () => {

    const { data: session } = useSession();

    return (
        <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
        <div class="px-6 w-full flex flex-wrap items-center justify-between">
            {/* <div class="flex items-center">
            <button
                class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                >
                <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                ></path>
                </svg>
            </button>
            </div> */}
            <div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
            <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
                <li class="nav-item">
                <Link href="/">
                    <a 
                    class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" 
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        Home
                    </a>
                </Link>
                </li>
                <li class="nav-item">
                <Link href="#">
                    <a 
                    onClick={
                        () => {
                            if (session) {
                                signOut()
                            } else {
                                signIn('google')
                            }
                            return false;
                        }
                    }
                    class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"  
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        { session ? "Logout" : "Login" }
                    </a>
                </Link>
                </li>
                <li class="nav-item">
                <Link href="/myPosts">
                    <a 
                    class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"  
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        My Posts
                    </a>
                </Link>
                </li>
                <li class="nav-item mb-2 lg:mb-0">
                <Link href="/feed">
                    <a 
                    class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"  
                    data-mdb-ripple="true" 
                    data-mdb-ripple-color="light">
                        The Feed
                    </a>
                </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>

    )}

export default Header