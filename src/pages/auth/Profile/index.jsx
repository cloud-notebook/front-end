import { useEffect, useState } from 'react';
import './style.css';
import { useUserProfileQuery } from '../../../services/user.service';

export default function Profile() {
    const [profile, setProfile] = useState(null)

    const { data, isError, isLoading, isSuccess, error } = useUserProfileQuery();
    useEffect(() => {
        if (isSuccess) {
            setProfile(data?.profile)
        }
    }, [data])
    return (
        <div className='profile-container dark:text-white'>
            <div className="image-container">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <div className="profile-data-container">
                <h1>Profile</h1>
                <div className="data">
                    <p>Full Name: <span>{profile?.name}</span></p>
                    <p>Email : <span>{profile?.email}</span></p>
                    <p>username : <span>{profile?.username}</span></p>
                </div>
            </div>
        </div>
    )
}

