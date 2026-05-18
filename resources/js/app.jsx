import { createRoot } from 'react-dom/client';
import Header from './Header';
import Login from './Login';
import HomeStudent from './HomeStudent';

const root = createRoot(document.getElementById('app'));
root.render(
    <HomeStudent />
)