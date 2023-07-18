import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Auth from './auth';
import UnAuth from './unAuth';
import { login } from '../states/login.state';
import { setUser } from '../states/user.state';


export default function RootRoute() {
    const loginInfo = useSelector(state => state.login);
    useEffect(() => {
        console.log(loginInfo.isLoggedIn)
    }, [loginInfo.isLoggedIn])
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = localStorage.getItem('user')
            dispatch(login({ token: token, expiresAt: "" }));
            dispatch(setUser(JSON.parse(user)));
        }

        const theme = localStorage.getItem('theme')
        document.documentElement.classList.toggle(theme);
        document.body.classList.add('dark:bg-slate-800');
    }
        , []);


    if (loginInfo.isLoggedIn) {
        return <Auth />
    }

    if (!loginInfo.isLoggedIn) {
        return <UnAuth />
    }

}

