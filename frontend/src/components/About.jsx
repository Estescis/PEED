import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import '../css/about.css';

const About = () => {
    return (
        // Contenedor principal de la página "Sobre Nosotros".
        <div className="about-page">
            <main>
                <div className="container_about">
                    <h1>Sobre Nosotros</h1>

                    {/* Secciones que presentan la información de PEED */}
                    <section className="card left">
                        <div className="card-content">
                            <h2>Quiénes somos</h2>
                            <p>En PEED, creemos que la educación y la tecnología pueden transformar vidas. Nos dedicamos a crear experiencias educativas innovadoras y accesibles para todos.</p>
                        </div>
                        <div className="card-image">
                            <img src="/quienes_somos.jpg" alt="Quiénes somos" />
                        </div>
                    </section>

                    <section className="card right">
                        <div className="card-content">
                            <h2>Nuestra misión</h2>
                            <p>Nuestra misión es acercar el conocimiento y las habilidades digitales a todas las personas.</p>
                        </div>
                        <div className="card-image">
                            <img src="/mision.jpg" alt="Nuestra misión" />
                        </div>
                    </section>

                    <section className="card left">
                        <div className="card-content">
                            <h2>Nuestra visión</h2>
                            <p>Queremos ser referentes en educación digital en América Latina, inspirando a miles de usuarios a explorar, aprender y crecer de manera constante.</p>
                        </div>
                        <div className="card-image">
                            <img src="/vision.png" alt="Nuestra visión" />
                        </div>
                    </section>

                    <section className="card right">
                        <div className="card-content">
                            <h2>Nuestros valores</h2>
                            <ul>
                                <li><i className="fas fa-lightbulb"></i> <strong>Innovación:</strong> siempre buscamos nuevas formas de enseñar y aprender.</li>
                                <li><i className="fas fa-users"></i> <strong>Inclusión:</strong> todos tienen un lugar en nuestra comunidad.</li>
                                <li><i className="fas fa-hand-holding-heart"></i> <strong>Compromiso:</strong> trabajamos con pasión para generar un impacto positivo.</li>
                                <li><i className="fas fa-star"></i> <strong>Calidad:</strong> ofrecemos contenidos confiables y útiles para cada usuario.</li>
                            </ul>
                        </div>
                        <div className="card-image">
                            <img src="/nuestros_valores.jpg" alt="Nuestros valores" />
                        </div>
                    </section>

                    <section className="card left">
                        <div className="card-content">
                            <h2>Nuestra historia</h2>
                            <p>Fundado en 2020, PEED nació como un pequeño proyecto educativo con grandes ideas. Hoy, hemos crecido y logrado impactar a miles de estudiantes, conectando aprendizaje y tecnología de manera efectiva.</p>
                        </div>
                        <div className="card-image">
                            <img src="/historia.jpg" alt="Nuestra historia" />
                        </div>
                    </section>

                    <section className="card right">
                        <div className  ="card-content">
                            <h2>Nuestro equipo</h2>
                            <p>Un grupo de profesionales apasionados por la educación y la innovación tecnológica, comprometidos en brindar la mejor experiencia a nuestros usuarios.</p>
                        </div>
                        <div className="card-image">
                            <img src="/nuestro_equipo.jpg" alt="Nuestro equipo" />
                        </div>
                    </section>

                    {/* Sección final con acceso al registro de nuevos usuarios */}
                    <section className="card left">
                        <div className="card-content">
                            <h2>Únete a nosotros</h2>
                            <p>Forma parte de nuestra comunidad.</p>
                            <Link to="/register" className="btn-unete">¡Únete ahora!</Link>
                        </div>
                        <div className="card-image">
                            <img src="/unete.jpg" alt="Unete" />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default About;