import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLinks, unAuthLinks } from '../helpers/links';
import { logout } from '../states/login.state';
import { removeUser } from '../states/user.state';
import Profile from './Profile';
import MobileMenu from './MobileMenu';
import { AiFillBell, AiOutlineMenu } from 'react-icons/ai';
import logo from '../assets/img/logo.png'
import { BsMoonStars } from 'react-icons/bs'
import { LuSunMoon } from 'react-icons/lu'


export default function Navbar() {

    const [darkMode, setDarkMode] = useState(false)

    const [mobileMenu, setMobileMenu] = useState(false)

    const dispatch = useDispatch()

    const loginInfo = useSelector(state => state.login);

    const location = useLocation();

    const [links, setLinks] = useState([])


    useEffect(() => {
        if (loginInfo.isLoggedIn) {
            setLinks(authLinks);
        }
        else {
            setLinks(unAuthLinks)
        }
    }, [loginInfo.isLoggedIn]);


    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        dispatch(removeUser());
        window.location.pathname = "/";
    }

    const toggleDarkMode = () => {
        if (localStorage.getItem('theme') === 'light') {
            setDarkMode(true)
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        else {
            setDarkMode(false)
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }


    return (
        <nav className="bg-green-600 dark:bg-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setMobileMenu(!mobileMenu)}>
                            <AiOutlineMenu />
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto lg:hidden" src={logo} alt="Your Company" />
                            <img className="hidden h-8 w-auto lg:block" src={logo} alt="Your Company" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {
                                    links.map(link => {
                                        return <Link key={link.path} to={link.path} className={`${link.path === location.pathname ? 'bg-green-950' : ''} text-gray-300 hover:bg-green-950 no-underline hover:text-white rounded-md px-3 py-2 text-sm font-medium`}>{link.name}</Link>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className='mr-4' onClick={toggleDarkMode}  >{!darkMode ? <BsMoonStars /> : <LuSunMoon className='text-yellow-500' />}</button>
                        <button type="button" className="rounded-full p-1 text-white ">
                            <AiFillBell size={24} />
                        </button>
                        <Profile handleLogout={handleLogout} />
                    </div>
                </div>
            </div>

            <MobileMenu links={links} open={mobileMenu} />
        </nav>

    )
}
