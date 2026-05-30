import PurchaseHistory from '../components/PurchaseHistory';
import ValidatorHistory from '../components/ValidatorHistory';
import SellerHistory from '../components/SellerHistory';

const History = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.tipo_usuario === 'validador') {
        return <ValidatorHistory />;
    }

    if (user?.tipo_usuario === 'vendedor') {
        return <SellerHistory />;
    }

    return <PurchaseHistory />;
}

export default History;