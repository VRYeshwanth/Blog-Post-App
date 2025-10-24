import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}