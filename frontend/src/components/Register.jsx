import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/register.css';

const Register = () => {
    // =====================================================
    // HOOK PARA REDIRECCIONAR ENTRE PÁGINAS
    // =====================================================
    const navigate = useNavigate();
    
    // =====================================================
    // ESTADOS DEL COMPONENTE
    // =====================================================

    // Controla el paso actual del formulario.
    const [step, setStep] = useState(1);

    // Guarda el tipo de usuario seleccionado.
    const [rol, setRol] = useState("");

    // Guarda toda la información del formulario.
    const [formData, setFormData] = useState({
        names: "",
        lastnames: "",
        gender: "",
        type_identification: "",
        identification: "",
        birthdate: "",
        age: "",
        department: "",
        id_city: "",
        phone: "",
        email: "",
        password: "",
        business_name: "",
        nit: "",
        dept_company: "",
        id_company_city: ""
    });

    // =====================================================
    // RECUPERAR DATOS DEL LOCALSTORAGE
    // =====================================================
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("formRegistro"));
        if (savedData) {
            // Separamos el rol para evitar guardarlo dentro
            // del formulario.
            const { rol, ...datosFormulario } = savedData;
            setFormData(datosFormulario);
            if (rol) {
                setRol(rol);
            }
        }
    }, []);

    // =====================================================
    // GUARDAR LOS CAMBIOS EN LOCALSTORAGE
    // =====================================================
    useEffect(() => {
        localStorage.setItem(
            "formRegistro",
            JSON.stringify({
                ...formData,
                rol
            })
        );
    }, [formData, rol]);

    // =====================================================
    // CALCULAR LA EDAD AUTOMÁTICAMENTE
    // =====================================================
    useEffect(() => {
        if (formData.birthdate) {
            const fechaNacimiento = new Date(formData.birthdate);
            const fechaActual = new Date();
            let edad =
                fechaActual.getFullYear() -
                fechaNacimiento.getFullYear();

            const diferenciaMes =
                fechaActual.getMonth() -
                fechaNacimiento.getMonth();

            if (
                diferenciaMes < 0 ||
                (
                    diferenciaMes === 0 &&
                    fechaActual.getDate() <
                    fechaNacimiento.getDate()
                )
            ) {
                edad--;
            }
            setFormData(prev => ({
                ...prev,
                age: edad >= 0 ? edad : ""
            }));
        }
    }, [formData.birthdate]);

    // =====================================================
    // ACTUALIZAR LOS CAMPOS DEL FORMULARIO
    // =====================================================
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // =====================================================
    // SELECCIONAR EL ROL DEL USUARIO
    // =====================================================
    const seleccionarRol = (tipo) => {
        const rolFormateado =
            tipo.charAt(0).toUpperCase() +
            tipo.slice(1);
        setRol(rolFormateado);
        setStep(2);
    };

    // =====================================================
    // VALIDAR LOS CAMPOS OBLIGATORIOS
    // =====================================================
    const validarPaso = () => {
        const camposPaso2 = [
            "names",
            "lastnames",
            "gender",
            "type_identification",
            "identification",
            "birthdate"
        ];

        const camposPaso3 = [
            "department",
            "id_city",
            "phone",
            "email",
            "password"
        ];

        const camposPaso4 = [
            "business_name",
            "nit",
            "dept_company",
            "id_company_city"
        ];

        let campos = [];
        if (step === 2) campos = camposPaso2;
        if (step === 3) campos = camposPaso3;
        if (step === 4) campos = camposPaso4;

        const faltantes = campos.filter(
            campo => !formData[campo]
        );

        if (faltantes.length > 0) {
            alert("Por favor completa todos los campos obligatorios.");
            return false;
        }
        return true;
    };

    // =====================================================
    // AVANZAR AL SIGUIENTE PASO
    // =====================================================
    const siguientePaso = () => {
        if (!validarPaso()) return;
        if (
            step === 3 &&
            rol === "Candidato"
        ) {
            finalizarRegistro();
        } else {
            setStep(step + 1);
        }
    };

    // =====================================================
    // REGRESAR AL PASO ANTERIOR
    // =====================================================
    const atrasPaso = () => {
        setStep(step - 1);
    };

    // =====================================================
    // REGISTRAR EL USUARIO
    // =====================================================
    const finalizarRegistro = async (e) => {
        if (e) {
            e.preventDefault();
        }
        if (!validarPaso()) return;

        // ==========================================
        // CREAR EL OBJETO SEGÚN EL TIPO DE USUARIO
        // ==========================================
        let nuevoUsuario;
        // Si es candidato solamente se guardan
        // los datos personales.
        if (rol === "Candidato") {
            nuevoUsuario = {

                names: formData.names,
                lastnames: formData.lastnames,
                gender: formData.gender,
                typeIdentification: formData.type_identification,
                identification: formData.identification,
                birthdate: formData.birthdate,
                department: formData.department,
                city: {
                    idcity: Number(formData.id_city)
                },
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
                userType: rol
            };
        }
        // Si es administrador también se guardan
        // los datos de la empresa.
        else {
            nuevoUsuario = {
                names: formData.names,
                lastnames: formData.lastnames,
                gender: formData.gender,
                typeIdentification: formData.type_identification,
                identification: formData.identification,
                birthdate: formData.birthdate,
                department: formData.department,
                city: {
                    idcity: Number(formData.id_city)
                },
                phone: formData.phone,
                email: formData.email,
                password: formData.password,

                business_name: formData.business_name,
                nit: formData.nit,
                dept_company: formData.dept_company,
                id_company_city: formData.id_company_city,
                userType: rol
            };
        }
        try {
            // =======================================================
            // ENVIAR LOS DATOS AL BACKEND PARA REGISTRAR EL USUARIO
            // =======================================================
            console.log("Usuario que se enviará:");
            console.log(nuevoUsuario);
            
            const respuesta = await fetch(
                "http://localhost:8080/user/new",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                body: JSON.stringify(nuevoUsuario)
                }
            );

            if (!respuesta.ok) {
                throw new Error("Error al registrar el usuario.");
            }
            const usuario = await respuesta.json();
            console.log("Usuario registrado:");
            console.log(usuario);
            alert("Registro realizado correctamente.");

            // Elimina el formulario temporal.
            localStorage.removeItem("formRegistro");

            // Redirecciona al Login.
            navigate("/login");
        }
        catch (error) {
            console.error(error);
            alert("Error completo:", error);
            alert(error.message);
        }
    };

    // =====================================================
    // COMPONENTE PARA EL ASTERISCO
    // =====================================================
    const Asterisk = () => (
        <span style={{ color: "red", marginLeft: "4px" }}>
            *
        </span>
    );
    return (
        <div className="layout">
            {/* Imagen decorativa ubicada al lado izquierdo */}
            <div className="lado-imagen">
                <img
                    src="/fondo_register.png"
                    alt="Registro"
                />
            </div>
            {/* Contenedor principal del formulario */}
            <div className="lado-formulario">
                {/* Enlace para regresar al inicio */}
                <Link
                    to="/"
                    className="btn-volver"
                >
                    ← Inicio
                </Link>
                <div className="contenedor">
                    <form id="formRegistroJava">
                        {/* =====================================================
                            PASO 1
                            SELECCIÓN DEL TIPO DE CUENTA
                        ====================================================== */}
                        <div className={`paso ${step === 1 ? "activo" : ""}`}>
                            <h2>
                                Tipo de cuenta <Asterisk />
                            </h2>

                            <button
                                type="button"
                                onClick={() => seleccionarRol("candidato")}
                            >
                                Candidato
                            </button>

                            <button
                                type="button"
                                onClick={() => seleccionarRol("administrador")}
                            >
                                Administrador
                            </button>
                        </div>

                        {/* =====================================================
                            PASO 2
                            DATOS PERSONALES
                        ====================================================== */}
                        <div className={`paso ${step === 2 ? "activo" : ""}`}>
                            <h2>Datos personales</h2>
                            <label>Nombres <Asterisk /></label>
                            <input
                                type="text"
                                name="names"
                                value={formData.names}
                                onChange={handleChange}
                                placeholder="Nombres"
                                required
                            />

                            <label>Apellidos <Asterisk /></label>
                            <input
                                type="text"
                                name="lastnames"
                                value={formData.lastnames}
                                onChange={handleChange}
                                placeholder="Apellidos"
                                required
                            />

                            <label>Género <Asterisk /></label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione Género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>

                            <label>Tipo de Identificación <Asterisk /></label>
                            <select
                                name="type_identification"
                                value={formData.type_identification}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione Tipo</option>
                                <option value="CC">Cédula de Ciudadanía (CC)</option>
                                <option value="TI">Tarjeta de Identidad (TI)</option>
                                <option value="CE">Cédula de Extranjería (CE)</option>
                                <option value="PPT">Permiso de Protección Temporal (PPT)</option>
                            </select>

                            <label>Número de Identificación <Asterisk /></label>
                            <input
                                type="text"
                                name="identification"
                                value={formData.identification}
                                onChange={handleChange}
                                placeholder="Número de Identificación"
                                required
                            />

                            <label>Fecha de Nacimiento <Asterisk /></label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                            />

                            {/* La edad es calculada automáticamente */}
                            <label>Edad (Calculada)</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                readOnly
                            />

                            {/* Navegación entre pasos */}
                            <div className="botones">

                                <button
                                    type="button"
                                    onClick={atrasPaso}
                                >
                                    ⬅ Atrás
                                </button>

                                <button
                                    type="button"
                                    onClick={siguientePaso}
                                >
                                    Siguiente ➡
                                </button>
                            </div>
                        </div>

                        {/* =====================================================
                            PASO 3
                            UBICACIÓN Y CUENTA
                        ====================================================== */}
                        <div className={`paso ${step === 3 ? "activo" : ""}`}>
                            <h2>Ubicación y Cuenta</h2>

                            <label>Departamento <Asterisk /></label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona Departamento</option>
                                <option value="76">Valle del Cauca</option>
                                <option value="05">Antioquia</option>
                            </select>

                            {/* La ciudad se habilita cuando existe un departamento */}
                            <label>Ciudad <Asterisk /></label>
                            <select
                                name="id_city"
                                value={formData.id_city}
                                onChange={handleChange}
                                required
                                disabled={!formData.department}
                            >
                                <option value="">Selecciona Ciudad</option>
                                <option value="1">Cali</option>
                                <option value="2">Medellín</option>
                            </select>

                            <label>Teléfono <Asterisk /></label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                required
                            />

                            <label>Correo Electrónico <Asterisk /></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo Electrónico"
                                required
                            />

                            <label>Contraseña <Asterisk /></label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                required
                            />

                            {/* Si es candidato aquí termina el registro.
                                Si es administrador continúa al paso 4. */}
                            <div className="botones">

                                <button
                                    type="button"
                                    onClick={atrasPaso}
                                >
                                    ⬅ Atrás
                                </button>

                                <button
                                    type="button"
                                    onClick={siguientePaso}
                                >
                                    {rol === "Candidato"
                                        ? "Finalizar"
                                        : "Siguiente ➡"}
                                </button>
                            </div>
                        </div>

                        {/* =====================================================
                            PASO 4
                            INFORMACIÓN DE LA EMPRESA
                            Solo aplica para Administradores.
                        ====================================================== */}
                        <div className={`paso ${step === 4 ? "activo" : ""}`}>
                            <h2>Datos de empresa</h2>

                            <label>Razón Social <Asterisk /></label>
                            <input
                                type="text"
                                name="business_name"
                                value={formData.business_name}
                                onChange={handleChange}
                                placeholder="Razón Social"
                                required
                            />

                            <label>NIT <Asterisk /></label>
                            <input
                                type="text"
                                name="nit"
                                value={formData.nit}
                                onChange={handleChange}
                                placeholder="NIT"
                                required
                            />

                            <label>Departamento Empresa <Asterisk /></label>
                            <select
                                name="dept_company"
                                value={formData.dept_company}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Departamento</option>
                                <option value="76">Valle del Cauca</option>
                                <option value="05">Antioquia</option>
                            </select>

                            <label>Ciudad Empresa <Asterisk /></label>
                            <select
                                name="id_company_city"
                                value={formData.id_company_city}
                                onChange={handleChange}
                                required
                                disabled={!formData.dept_company}
                            >
                                <option value="">Ciudad</option>
                                <option value="1">Cali</option>
                                <option value="2">Medellín</option>
                            </select>

                            {/* Botones finales del formulario */}
                            <div className="botones">

                                <button
                                    type="button"
                                    onClick={atrasPaso}
                                >
                                    ⬅ Atrás
                                </button>

                                <button
                                    type="button"
                                    onClick={finalizarRegistro}
                                >
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;