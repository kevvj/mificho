import HomeStudent from '../components/HomeStudent';
import HomeValidator from '../components/HomeValidator';
import HomeSeller from '../components/HomeSeller';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.tipo_usuario === 'validador') {
        return <HomeValidator />;
    }

    if (user?.tipo_usuario === 'vendedor') {
        return <HomeSeller />;
    }

    return <HomeStudent />;
}

export default Home;