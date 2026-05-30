import PurchaseHistory from '../components/PurchaseHistory';
import ValidatorHistory from '../components/ValidatorHistory';

const History = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.tipo_usuario === 'validador') {
        return <ValidatorHistory />;
    }

    return <PurchaseHistory />;
}

export default History;