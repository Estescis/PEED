import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
    const navigate = useNavigate();

    // =====================================================
    // ESTADO DEL FORMULARIO
    // =====================================================
    // Almacena la identificación y contraseña
    // ingresadas por el usuario.
    const [formData, setFormData] = useState({
        identification: "",
        password: ""
    });

    // =====================================================
    // ACTUALIZAR LOS DATOS DEL FORMULARIO
    // =====================================================
    // Cada vez que el usuario escribe en un campo,
    // el estado se actualiza automáticamente.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // AUTENTICAR AL USUARIO
    // =====================================================
    // Envía la identificación y contraseña al backend
    // para realizar el proceso de autenticación.
    const handleSubmit = async (e) => {
        // Evita que el formulario recargue la página.
        e.preventDefault();

        // Verifica que ambos campos estén diligenciados.
        if (
            formData.identification.trim() === "" ||
            formData.password.trim() === ""
        ) {
            alert("Por favor completa todos los campos.");
            return;
        }
        try {
            // ===============================================
            // OBTENER TODOS LOS USUARIOS DEL SERVIDOR
            // ===============================================
            const respuesta = await fetch(
                "http://localhost:8080/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        identification: formData.identification,
                        password: formData.password
                    })
                }
            );

            // Si el servidor respondió con un error de credenciales (ej. 401, 400, 404)
            if (!respuesta.ok) {
                throw new Error("Error al iniciar sesión");
            }

            // Convertimos la respuesta a texto primero para verificar si viene vacía
            const textoRespuesta = await respuesta.text();
            const usuarioEncontrado = textoRespuesta ? JSON.parse(textoRespuesta) : null;

            // ===============================================
            // AUTENTICACIÓN EXITOSA
            // ===============================================
            if (usuarioEncontrado) {
                alert("Autenticación Satisfactoria");

                console.log("Usuario autenticado:");
                console.log(usuarioEncontrado);

                // Guardar el usuario en el almacenamiento local
                localStorage.setItem(
                    "usuarioLogueado",
                    JSON.stringify(usuarioEncontrado)
                );

                // Redireccionar según tipo de usuario
                if(usuarioEncontrado.userType === "Administrador"){
                    navigate("/dashboard");
                }
                else if(usuarioEncontrado.userType === "Candidato"){
                    navigate("/dashboard");
                }
            }

            // ===============================================
            // AUTENTICACIÓN INCORRECTA
            // ===============================================
            else {
                alert("Número de identificación o contraseña incorrectos.");
            }
        }
        catch (error) {
            console.error(error);
            alert("No fue posible conectar con el servidor.");
        }
    };

    return (
        <div className="login-container">
            {/* Logo de PEED.
                Al hacer clic regresa a la página principal. */}
            <Link to="/">
                <img
                    src="/logo_peed.png"
                    alt="Logo de PEED"
                    className="logo"
                />
            </Link>

            {/* Contenedor del formulario */}
            <div className="login-box">
                <h2>Iniciar Sesión</h2>

                {/* Formulario de autenticación */}
                <form onSubmit={handleSubmit}>

                    {/* Campo para la identificación */}
                    <div className="input-group">
                        <label>Identificación</label>

                        <input
                            type="text"
                            name="identification"
                            placeholder="Ingrese su identificación"
                            value={formData.identification}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Campo para la contraseña */}
                    <div className="input-group">
                        <label>Contraseña</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Botón que ejecuta la autenticación */}
                    <button type="submit">
                        Entrar
                    </button>

                    {/* Enlace para contactar al soporte */}
                    <p className="extra">
                        ¿Olvidaste tu contraseña?{" "}
                        <Link to="/support">
                            Contacta a soporte
                        </Link>
                    </p>

                    {/* Enlace para registrarse */}
                    <p className="extra">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;