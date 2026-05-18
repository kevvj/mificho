import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import HomeStudent from './HomeStudent';
import BuyTicket from './BuyTicket';

const root = createRoot(document.getElementById('app'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<HomeStudent />} />
            <Route path="/buyticket" element={<BuyTicket />} />

        </Routes>
    </BrowserRouter>
)