import HomeStudent from '../components/HomeStudent';
import HomeValidator from '../components/HomeValidator';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.tipo_usuario === 'validador') {
        return <HomeValidator />;
    }

    return <HomeStudent />;
}

export default Home;