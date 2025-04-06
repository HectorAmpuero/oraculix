import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No hay usuarios registrados.");
      return;
    }

    if (storedUser.email !== email) {
      setError("El correo ingresado no está registrado.");
      return;
    }

    // Omitimos validación de contraseña por ahora (ya que no se guarda)
    // Si quisieras guardar la contraseña, deberías incluirla en localStorage al registrarse

    // Login exitoso
    setError("");
    onClose();
    navigate("/cuenta");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Iniciar Sesión</h2>
        <form className="boxform" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Iniciar sesión</button>
          {error && <p className="error">{error}</p>}
        </form>
        <button className="close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default LoginModal;