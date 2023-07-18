import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/unAuth/Login'
import Register from '../../pages/unAuth/Register'
import Navbar from '../../components/unAuth/Navbar'
import Home from '../../pages/unAuth/Home'
import AboutPage from '../../pages/unAuth/About'
import ContactPage from '../../pages/unAuth/Contact'


export default function UnAuth() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    )
}
