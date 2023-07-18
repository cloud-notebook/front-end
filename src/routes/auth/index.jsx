import { Route, Routes } from 'react-router-dom'
import Navbar from '../../components/Navbar'

import { AddNote } from "../../pages/auth/AddNote";
import MyNotes from "../../pages/auth/MyNotes";
import NoteDetail from "../../pages/auth/NoteDetail";
import Profile from '../../pages/auth/Profile';
import PublicNotes from '../../pages/unAuth/PublicNotes';
import Dashboard from '../../pages/auth/Dashboard';


export default function Auth() {
    return (
        <div className='dark:bg-slate-800 min-h-screen'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/notes' element={<MyNotes />} />
                <Route path='/create-note' element={<AddNote />} />
                <Route path='notes/note/:id' element={<NoteDetail />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/public-notes' element={<PublicNotes />} />
                <Route path='/public-notes/note/:id' element={<NoteDetail />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    )
}
