import { React, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { unAuthLinks } from "../../helpers/links";
import { BsMoonStars } from "react-icons/bs";
import { LuSunMoon } from "react-icons/lu";


export default function Navbar() {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
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
        <div className="flex justify-between p-4 dark:bg-black bg-green-600 items-center">
            <div className='flex justify-between items-center'>
                <Link to={'/'}><h5 className="text-white font-bold text-2xl">i<span className="text-yellow-500">Cloud</span>NoteBook</h5></Link>
                <div id="hamburger-menu">
                    <div className="hamburger-bar"></div>
                    <div className="hamburger-bar"></div>
                    <div className="hamburger-bar"></div>
                </div>
            </div>
            <div>
                <ul className="flex gap-4 items-center">
                    {
                        unAuthLinks.map((item, index) => {
                            return <li key={index}><Link className={`${location.pathname === item.path ? 'text-yellow-500' : ' text-white'} no-underline`} to={item.path}>{item.name}</Link></li>

                        })
                    }
                    <div className="space-x-5">
                        <Link to={'/register'} className=" no-underline bg-yellow-500 text-white rounded-md px-2 py-1">Join Us</Link>
                        <Link to={'/login'} className="no-underline border border-yellow-500 text-white rounded-md px-2 py-1">Sign Up</Link>
                    </div>
                    <button className='mr-4' onClick={toggleDarkMode}  >{!darkMode ? <BsMoonStars /> : <LuSunMoon className='text-yellow-500' />}</button>
                </ul>

            </div>
        </div>
    )
}
