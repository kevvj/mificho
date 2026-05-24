import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import HomeStudent from './components/HomeStudent';
import BuyTicket from './components/BuyTicket';
import PurchaseHistory from './components/History';

const root = createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeStudent />} />
            <Route path="/buyticket" element={<BuyTicket />} />
            <Route path="/history" element={<PurchaseHistory />} />


        </Routes>
    </BrowserRouter>
)