import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
    <>
        <Header />
        <Nav />
        <main>
            <Outlet /> {/* Aquí se inserta el Home, Notices, etc. */}
        </main>
        <Footer />
    </>
);
export default Layout;