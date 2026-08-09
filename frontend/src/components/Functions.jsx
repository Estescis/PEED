import React, { useState } from 'react';
import '../css/functions.css';

const Functions = () => {
    // Estado que almacena la categoría seleccionada para filtrar las funciones.
    const [categoria, setCategoria] = useState('all');
    // Estado que guarda la función seleccionada para mostrar su vista detallada.
    const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

    // Lista de funciones disponibles en la plataforma.
    const funciones = [
        { id: 'f1', cat: 'evaluacion', titulo: 'Crear Exámenes', img: 'https://picsum.photos/400/200?1', resumen: 'Diseña evaluaciones...', contenido: `<h1>Crear Exámenes</h1><p class="intro">La funcionalidad de...</p>...` },
        { id: 'f2', cat: 'evaluacion', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?2', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f3', cat: 'evaluacion', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?3', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f4', cat: 'gestion', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?4', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f5', cat: 'gestion', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?5', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f6', cat: 'gestion', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?6', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f7', cat: 'seguridad', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?7', resumen: 'Obtén resultados...', contenido: `...` },
        { id: 'f8', cat: 'seguridad', titulo: 'Calificación Automática', img: 'https://picsum.photos/400/200?8', resumen: 'Obtén resultados...', contenido: `...` },
        // Agrega aquí todas tus funciones
    ];

    // Filtra las funciones según la categoría seleccionada.
    const filtradas = categoria === 'all' ? funciones : funciones.filter(f => f.cat === categoria);

    return (
        <div className="functions-container">
            {/* Vista detallada de la función seleccionada */}
            {funcionSeleccionada ? (
                <div className="vista-funcion">
                    <button className="btn-regresar" onClick={() => setFuncionSeleccionada(null)}>← Volver</button>
                    <div className="card-grande" dangerouslySetInnerHTML={{ __html: funcionSeleccionada.contenido }} />
                </div>
            ) : (
        
            <>
                {/* Botones para filtrar las funciones por categoría */}
                <div className="filtro">
                    <button id="btn-volver" onClick={() => setCategoria('all')} style={{display: categoria === 'all' ? 'none' : 'inline-block'}}>
                        <i className="fa-solid fa-arrow-left"></i> Todos
                    </button>
                    <div className="grupo-botones">
                        <button onClick={() => setCategoria('evaluacion')}>Evaluación</button>
                        <button onClick={() => setCategoria('gestion')}>Gestión</button>
                        <button onClick={() => setCategoria('seguridad')}>Seguridad</button>
                    </div>
                </div>

                {/* Muestra las tarjetas de las funciones filtradas */}
                <section className="funciones">
                    {filtradas.map(f => (
                        <div key={f.id} className={`card ${f.cat}`} onClick={() => setFuncionSeleccionada(f)}>
                            <img src={f.img} alt={f.titulo} />
                            <div className="card-content"><h3>{f.titulo}</h3></div>
                            <div className="card-overlay">{f.resumen}</div>
                        </div>
                    ))}
                </section>
            </>
            )}
        </div>
    );
};

export default Functions;