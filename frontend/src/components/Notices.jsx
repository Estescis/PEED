import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/notices.css';

const Notices = () => {
    // Lista de noticias disponibles en la plataforma.
    const noticias = [
        {
            id: 1,
            titulo: "Lanzamiento de nueva actualización en PEED",
            resumen: "Mejoras importantes en el sistema de evaluación...",
            imagen: "/fondo_noticias.jpg",
            contenido: `
                <h2>Lanzamiento de nueva actualización en PEED</h2>
                <p>La plataforma PEED continúa evolucionando con mejoras importantes en el sistema de evaluación digital, buscando ofrecer una experiencia más rápida, estable y moderna para estudiantes y docentes.</p>
                <img src="https://informaticos.co/wp-content/uploads/2023/02/Actualizaciones-de-software-no-las-ignores.jpg" alt="Actualización" />
                <div className="notices-page highlight">Esta actualización mejora el rendimiento del sistema y la navegación entre módulos.</div>
                <p>Entre las nuevas mejoras se incluyen optimizaciones en la carga de contenido, mejor organización de las noticias y una interfaz más limpia y responsiva.</p><br>
                <h3> Mejoras principales</h3><br>
                <ul>
                    <li>Mayor velocidad de carga</li>
                    <li>Interfaz más moderna</li>
                    <li>Mejor experiencia de usuario</li>
                    <li>Compatibilidad con dispositivos móviles</li>
                </ul><br>
                <p>Seguiremos trabajando para que PEED se convierta en una de las mejores plataformas educativas digitales.</p>
                `
        },
        {
            id: 2,
            titulo: "Empresas Registradas",
            resumen: "Conoce las empresas registradas",
            imagen: "/fondo_noticias.jpg",
            contenido: `<h2>Título de la noticia 2</h2><p>Contenido detallado de la noticia 2.</p>`
        },
        {
            id: 3,
            titulo: "Exámenes de Empresas",
            resumen: "Crea tus propios exámenes",
            imagen: "/fondo_noticias.jpg",
            contenido: `<h2>Título de la noticia 3</h2><p>Contenido detallado de la noticia 3.</p>`
        },
        {
            id: 4,
            titulo: "Noticia 4",
            resumen: "Resumen de la cuarta noticia...",
            imagen: "/fondo_noticias.jpg",
            contenido: `<h2>Título de la noticia 4</h2><p>Contenido detallado de la noticia 4.</p>`
        }
    ];

    // Obtiene el parámetro "id" enviado desde la URL y almacena la noticia seleccionada.
    const [searchParams] = useSearchParams();
    const noticiaId = searchParams.get("id"); // Lee el ?id=1 de la URL
    const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

    // Carga automáticamente la noticia correspondiente al id recibido en la URL.
    useEffect(() => {
        if (noticiaId) {
            const n = noticias.find(item => item.id === parseInt(noticiaId));
            setNoticiaSeleccionada(n);
        }
    }, [noticiaId]);

    return (
        <div className="notices-page">
            <div className="container">
                {/* Barra lateral que muestra el listado de noticias */}
                <aside className="sidebar" id="lista-noticias">
                    {noticias.map((n) => (
                        <article key={n.id} className="card" onClick={() => setNoticiaSeleccionada(n)}>
                            <div className="card-bg" style={{ backgroundImage: `url('${n.imagen}')` }}>
                                <div className="card-overlay">
                                    <h3>{n.titulo}</h3>
                                    <p>{n.resumen}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </aside>

                {/* Visor que muestra el contenido completo de la noticia seleccionada */}
                <main className={`viewer ${noticiaSeleccionada ? 'noticia-cargada' : ''}`}>
                    {noticiaSeleccionada ? (
                        <div dangerouslySetInnerHTML={{ __html: noticiaSeleccionada.contenido }} />
                    ) : (
                        <div id="placeholder">
                            <img src="/fondo_visor.png" alt="Presentación Noticia" />
                            <p>TODAS LAS NOTICIAS SOBRE TU PLATAFORMA PEED</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Notices;