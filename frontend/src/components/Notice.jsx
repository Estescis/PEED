import React from 'react';
import NoticeCard from './NoticeCard'; // Traemos el molde base
import { Link } from 'react-router-dom';
import '../css/notice.css';

const Notice = () => {
    
    // Lista que almacena la información de las noticias que se mostrarán.
    const listaDeNoticias = [
        {
            id: 1,
            titulo: "Nuevas Actualizaciones",
            descripcion: "Hemos implementado un avanzado motor de Inteligencia Artificial diseñado para detectar comportamientos inusuales durante las evaluaciones en línea. Esta actualización incluye el análisis biométrico facial y el monitoreo de pestañas activas en el navegador, garantizando que cada examen digital se realice bajo los más altos estándares de integridad académica y transparencia institucional, sin comprometer la fluidez de la experiencia del usuario.",
            imagen: "/noticia_1.png"
        },
        {
            id: 2,
            titulo: "Empresas Registradas",
            descripcion: "Nuestra comunidad sigue expandiéndose con la llegada de más de 50 nuevas organizaciones del sector tecnológico y educativo este mes. Estas empresas están transformando sus procesos de selección y capacitación interna mediante el uso de nuestras herramientas de evaluación masiva. Gracias a la flexibilidad de PEED, ahora pueden certificar las habilidades técnicas de sus colaboradores en tiempo récord y con resultados validados globalmente",
            imagen: "/noticia_2.png"
        },
        {
            id: 3,
            titulo: "Exámenes de Empresas",
            descripcion: "Optimiza la toma de decisiones con nuestra nueva consola de análisis de datos para reclutadores. Ahora es posible generar informes comparativos automáticos que evalúan no solo el puntaje final, sino también el tiempo de respuesta por pregunta y el nivel de dificultad percibido. Esta funcionalidad permite a las empresas identificar los talentos más aptos de forma objetiva, reduciendo los tiempos de contratación en un 60%.",
            imagen: "/noticia_3.png"
        }
    ];

    return (
        <section className="contenedor_noticias">
            {/* Recorre la lista de noticias y crea una tarjeta para cada una */}
            {listaDeNoticias.map((item) => (
                // Cada tarjeta funciona como un enlace hacia el detalle de la noticia.
                <Link key={item.id} to={`/notices?id=${item.id}`} className="link_tarjeta">
                    <NoticeCard 
                        id={item.id}
                        titulo={item.titulo}
                        descripcion={item.descripcion}
                        imagen={item.imagen}
                    />
                </Link>
            ))}
        </section>
    );
};

export default Notice;