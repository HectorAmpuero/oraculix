import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Cuenta = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("user"));
    if (!usuario) {
      navigate("/");
    } else {
      setUser(usuario);
      fetchHistorial(usuario.email);
    }
  }, [navigate]);

  const fetchHistorial = async (email) => {
    try {
      const res = await fetch(`http://localhost:3001/api/lecturas/${email}`);
      const data = await res.json();
      setHistorial(data);
    } catch (err) {
      console.error("Error al cargar historial:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="cuenta-container">
      <h2>¡Hola, {user?.nombre || "Usuario"}!</h2>
      <p className="email">Correo: {user?.email || "No disponible"}</p>

      <div className="mensaje-bienvenida">
        <p>
          ¿Estás listo para descubrir los números que guían tu vida?
        </p>
        <button className="btn" onClick={() => navigate("/formulario")}>
          Comenzar mi lectura
        </button>
      </div>

      <div className="frase-motivacional">
        <p>✨ “Tu energía atrae lo que tu alma necesita. Confía en tus números.” ✨</p>
      </div>

      <button className="btn" onClick={() => setModalVisible(true)}>
        Ver historial de lecturas
      </button>

      <button className="btn logout" onClick={handleLogout}>
        Cerrar sesión
      </button>

      {/* Modal de historial */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Historial de lecturas</h3>
            <button className="close-btn" onClick={() => setModalVisible(false)}>
              ✖
            </button>
            {historial.length === 0 ? (
              <p>No tienes lecturas previas.</p>
            ) : (
              historial.map((lectura, index) => (
                <div className="lectura-item" key={index}>
                  <p><strong>Fecha:</strong> {new Date(lectura.fecha_creacion).toLocaleString()}</p>
                  <p><strong>Números principales:</strong> {lectura.numeros_principales.join(" - ")}</p>
                  <p><strong>Números complementarios:</strong> {lectura.numeros_complementarios.join(" - ")}</p>
                  <p><strong>Interpretación:</strong> {lectura.interpretacion || "No disponible"}</p>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cuenta;