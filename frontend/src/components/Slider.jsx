import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/slider.css';

const Slider = () => {
    // Arreglo que contiene la información de cada diapositiva del Slider.
    const slides = [
        { id: 1, img: "/slider_1.png", titulo: "PEED: Plataforma Evaluadora", texto: "La solución para la evaluación del mañana." },
        { id: 2, img: "/slider_2.jpg", titulo: "Analiza en Tiempo Real", texto: "Gráficos detallados del progreso de tus candidatos." },
        { id: 3, img: "/slider_3.jpg", titulo: "Evaluación en Cualquier Lugar", texto: "Accede desde laptops, tablets o móviles." }
    ];

    // Estado que almacena la diapositiva que se está mostrando actualmente.
    const [indiceActual, setIndiceActual] = useState(0);

    // Cambia la diapositiva y permite volver al inicio o al final del Slider.
    const cambiarSlide = (nuevoIndice) => {
        // Si el índice es mayor a la lista, vuelve a 0. Si es menor, va al final.
        setIndiceActual((nuevoIndice + slides.length) % slides.length);
    };

    // Cambia automáticamente de diapositiva cada 8 segundos.
    useEffect(() => {
        const intervalo = setInterval(() => {
            cambiarSlide(indiceActual + 1);
        }, 8000);
        return () => clearInterval(intervalo); // Limpia el reloj si el componente se va
    }, [indiceActual]); // Se ejecuta cada vez que cambia el índice

    return (
        <section className="contenedor_slider">
            <div className="slider">
                {slides.map((slide, i) => (
                    // Si el índice coincide con el actual, le pone la clase 'active'
                    <div key={slide.id} className={`slide ${i === indiceActual ? 'active' : ''}`}>
                        <img src={slide.img} alt={slide.titulo} />
                        <div className="superposicion">
                            <h1>{slide.titulo}</h1>
                            <p>{slide.texto}</p>
                            {i === 0 && (
                                <Link to="/login" className="boton_slider">Comienza Ahora</Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Botones para navegar manualmente entre las diapositivas */}
            <button className="anterior" onClick={() => cambiarSlide(indiceActual - 1)}>&#10094;</button>
            <button className="proximo" onClick={() => cambiarSlide(indiceActual + 1)}>&#10095;</button>
            
            {/* Indicadores que muestran la diapositiva activa y permiten seleccionarla */}
            <div className="puntos">
                {slides.map((_, i) => (
                    <span 
                        key={i} 
                        className={`punto ${i === indiceActual ? 'punto_activo' : ''}`}
                        onClick={() => cambiarSlide(i)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default Slider;