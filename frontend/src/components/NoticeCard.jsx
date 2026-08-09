import React from 'react';

// Aquí le decimos al molde: "Vas a recibir datos llamados id, titulo, descripcion e imagen"
const NoticeCard = ({ titulo, descripcion, imagen, onClick }) => {
    return (
        <article className="tarjeta" onClick={onClick}>
            <div className="imagen_tarjeta">
                {/* Aquí le pasamos los datos que recibimos al molde */}
                <img src={imagen} alt={titulo} />
            </div>
            <div className="contenido_tarjeta">
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
            </div>
        </article>
    );
};

export default NoticeCard; // Esto es para que otros archivos puedan usar este molde