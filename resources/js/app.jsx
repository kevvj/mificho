import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import HomeStudent from './pages/HomeStudent';
import BuyTicket from './pages/BuyTicket';
import PurchaseHistory from './pages/History';
import ForgotPassword from './pages/ForgotPassword';

export const API_URL = 'http://localhost:8000/api';

const root = createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeStudent />} />
            <Route path="/buyticket" element={<BuyTicket />} />
            <Route path="/history" element={<PurchaseHistory />} />
            <Route path="/lostpassword" element={<ForgotPassword />} />
        </Routes>
    </BrowserRouter>
)