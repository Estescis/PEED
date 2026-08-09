// Importa los componentes que conforman la página de inicio.
import Slider from './Slider';
import Notice from './Notice';

const Home = () => {
    return (
        <>
            |{/* Muestra el Slider y las Notice */}
            <Slider />
            <Notice />
        </>
    );
};

export default Home;