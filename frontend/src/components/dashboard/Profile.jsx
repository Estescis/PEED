import React, { useRef, useState } from 'react';

const Profile = ({ userRole = 'admin' }) => {
    const fileInputRef = useRef(null);

    // Estado inicial con todos los campos posibles
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        genero: '',
        tipoIdentificacion: 'CC',
        numeroIdentificacion: '',
        fechaNacimiento: '',
        departamento: '',
        ciudad: '',
        telefono: '',
        correo: '',
        contrasena: '',
        // Campos exclusivos para Admin (Empresa)
        razonSocial: '',
        nit: '',
        departamentoEmpresa: '',
        ciudadEmpresa: ''
    });

    const [edad, setEdad] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);

    // Función para calcular la edad automáticamente según la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return '';
        const hoy = new Date();
        const cumpleanos = new Date(fechaNacimiento);
        let edadCalculada = hoy.getFullYear() - cumpleanos.getFullYear();
        const m = hoy.getMonth() - cumpleanos.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edadCalculada--;
        }
        return edadCalculada >= 0 ? edadCalculada : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Si cambia la fecha de nacimiento, recalculamos la edad de inmediato
        if (name === 'fechaNacimiento') {
            setEdad(calcularEdad(value));
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen.');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('La imagen no debe superar 2 MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setFotoPerfil(reader.result);
        reader.readAsDataURL(file);
    };

    const handlePhotoRemove = () => {
        setFotoPerfil(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos guardados:", { ...formData, fotoPerfil });
        alert("¡Cambios guardados con éxito!");
    };

    return (
        <div className="profile-container">
            <h2>Configuración de Perfil ({userRole === 'admin' ? 'Administrador' : 'Candidato'})</h2>

            <div className="profile-photo-section">
                <div className="profile-photo-preview">
                    {fotoPerfil ? (
                        <img src={fotoPerfil} alt="Foto de perfil" />
                    ) : (
                        <i className="bx bx-user"></i>
                    )}
                </div>

                <div className="profile-photo-actions">
                    <p className="profile-photo-title">Foto de perfil</p>
                    <p className="profile-photo-hint">JPG, PNG o WEBP. Máximo 2 MB.</p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        hidden
                    />

                    <div className="profile-photo-buttons">
                        <button
                            type="button"
                            className="photo-btn photo-btn-upload"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <i className="bx bx-upload"></i>
                            {fotoPerfil ? 'Cambiar foto' : 'Subir foto'}
                        </button>

                        {fotoPerfil && (
                            <button
                                type="button"
                                className="photo-btn photo-btn-remove"
                                onClick={handlePhotoRemove}
                            >
                                <i className="bx bx-trash"></i>
                                Eliminar
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            <form className="profile-form" onSubmit={handleSubmit}>
                
                {/* --- DATOS PERSONALES (Comunes para ambos) --- */}
                <div className="form-group">
                    <label>Nombres</label>
                    <input 
                        type="text" 
                        name="nombres" 
                        value={formData.nombres} 
                        onChange={handleChange} 
                        placeholder="Tus nombres" 
                    />
                </div>

                <div className="form-group">
                    <label>Apellidos</label>
                    <input 
                        type="text" 
                        name="apellidos" 
                        value={formData.apellidos} 
                        onChange={handleChange} 
                        placeholder="Tus apellidos" 
                    />
                </div>

                <div className="form-group">
                    <label>Fecha de nacimiento</label>
                    <input 
                        type="date" 
                        name="fechaNacimiento" 
                        value={formData.fechaNacimiento} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label>Género</label>
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">Seleccione...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Tipo de identificación</label>
                    <select name="tipoIdentificacion" value={formData.tipoIdentificacion} onChange={handleChange}>
                        <option value="CC">Cédula de Ciudadanía</option>
                        <option value="CE">Cédula de Extranjería</option>
                        <option value="Pasaporte">Pasaporte</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Número de identificación</label>
                    <input 
                        type="text" 
                        name="numeroIdentificacion" 
                        value={formData.numeroIdentificacion} 
                        onChange={handleChange} 
                        placeholder="Número de documento" 
                    />
                </div>

                <div className="form-group">
                    <label>Edad (Años)</label>
                    <input 
                        type="text" 
                        value={edad} 
                        readOnly 
                        className="input-readonly"
                        placeholder="Se calcula automáticamente" 
                    />
                </div>

                <div className="form-group">
                    <label>Departamento</label>
                    <input 
                        type="text" 
                        name="departamento" 
                        value={formData.departamento} 
                        onChange={handleChange} 
                        placeholder="Departamento de residencia" 
                    />
                </div>

                <div className="form-group">
                    <label>Ciudad</label>
                    <input 
                        type="text" 
                        name="ciudad" 
                        value={formData.ciudad} 
                        onChange={handleChange} 
                        placeholder="Ciudad de residencia" 
                    />
                </div>

                <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                        type="tel" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleChange} 
                        placeholder="Número de teléfono" 
                    />
                </div>

                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input 
                        type="email" 
                        name="correo" 
                        value={formData.correo} 
                        onChange={handleChange} 
                        placeholder="ejemplo@correo.com" 
                    />
                </div>

                <div className="form-group">
                    <label>Contraseña</label>
                    <input 
                        type="password" 
                        name="contrasena" 
                        value={formData.contrasena} 
                        onChange={handleChange} 
                        placeholder="Nueva contraseña" 
                    />
                </div>

                {/* --- CAMPOS EXCLUSIVOS PARA ADMINISTRADOR (EMPRESA) --- */}
                {userRole === 'admin' && (
                    <>
                        <h3 className="profile-section-title">
                            Información de la Empresa
                        </h3>

                        <div className="form-group">
                            <label>Razón Social</label>
                            <input 
                                type="text" 
                                name="razonSocial" 
                                value={formData.razonSocial} 
                                onChange={handleChange} 
                                placeholder="Nombre de la empresa" 
                            />
                        </div>

                        <div className="form-group">
                            <label>NIT</label>
                            <input 
                                type="text" 
                                name="nit" 
                                value={formData.nit} 
                                onChange={handleChange} 
                                placeholder="NIT de la empresa" 
                            />
                        </div>

                        <div className="form-group">
                            <label>Departamento Empresa</label>
                            <input 
                                type="text" 
                                name="departamentoEmpresa" 
                                value={formData.departamentoEmpresa} 
                                onChange={handleChange} 
                                placeholder="Departamento de la empresa" 
                            />
                        </div>

                        <div className="form-group">
                            <label>Ciudad Empresa</label>
                            <input 
                                type="text" 
                                name="ciudadEmpresa" 
                                value={formData.ciudadEmpresa} 
                                onChange={handleChange} 
                                placeholder="Ciudad de la empresa" 
                            />
                        </div>
                    </>
                )}

                <div className="profile-form-actions">
                    <button type="submit" className="save-btn">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;

