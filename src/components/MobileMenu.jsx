import { useState } from "react"
import {Link, useLocation} from "react-router-dom"

export default function MobileMenu({ links, open }) {
    const location=useLocation()
    return (

        <div class={`sm:hidden transition-transform  ${open ? "block" : "hidden"}`} id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
                {
                    links.map((link, index) => {
                        return <Link key={index} to={link.path} class={`${link.path===location.pathname?'bg-gray-900 ':''} no-underline text-white block rounded-md px-3 py-2 text-base font-medium`} >{link.name}</Link>
                    })
                }
            </div>
        </div>
    )
}


