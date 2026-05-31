import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import BuyTicket from './pages/BuyTicket';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Profile from './pages/Profile';
import History from './pages/History';
import TablePanel from './pages/AdminPanel';


const root = createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/buyticket" element={<BuyTicket />} />
            <Route path="/history" element={<History />} />
            <Route path="/lostpassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/adminpanel" element={<TablePanel />} />


        </Routes>
    </BrowserRouter>
)