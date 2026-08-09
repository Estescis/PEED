import React, { useState } from 'react';
import '../css/support.css';

const Support = () => {
    // Estados para mostrar los archivos seleccionados y el mensaje de confirmación.
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    // Obtiene el nombre de los archivos seleccionados por el usuario.
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const archivos = Array.from(e.target.files).map(file => file.name);
            setNombreArchivo("Archivos seleccionados: " + archivos.join(", "));
        }
    };

    // Simula el envío del formulario y muestra un mensaje de confirmación.
    const handleSubmit = (e) => {
        e.preventDefault();
        setMostrarMensaje(true);
        e.target.reset();
        setNombreArchivo("");
        setTimeout(() => setMostrarMensaje(false), 4000);
    };

    return (
        <div className="support-page">
            <div className="init">
                <h1>Contacto</h1>
                <p>¿Tienes dudas sobre PEED? Escríbenos</p>
            </div>

            <div className="container">
                {/* Aquí va la información estática */}
        
                <div className="formulario">
                    <h2>Envíanos un mensaje</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nombre completo" required />
                        <input type="email" placeholder="Correo electrónico" required />
                        <input type="text" placeholder="Asunto" required />
                        <textarea placeholder="Escribe tu mensaje..." required></textarea>

                        {/* Permite adjuntar una o varias imágenes */}
                        <div className="input-group">
                            <label>Adjuntar imagen (opcional)</label>
                            <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                            <span>{nombreArchivo}</span>
                        </div>

                        <button type="submit">Enviar mensaje</button>
                        {mostrarMensaje && <div className="mensaje">¡Mensaje enviado correctamente! Nos pondremos en contacto pronto. ✔</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Support;