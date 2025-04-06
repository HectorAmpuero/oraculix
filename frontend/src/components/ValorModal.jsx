import React from "react";
import "../assets/styles.css";

const ValorModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>¿Por qué tiene un valor?</h3>
        <p>Porque creemos que las cosas con intención también tienen valor.</p>
        <p>
          La lectura que recibes es única, basada en tus datos personales. La
          diseñamos para entregarte tus números con sentido y sin humo.
        </p>
        <p>
          Además, con esos $1.500 nos ayudas a seguir mejorando Oraculix y
          llegar a más personas que, como tú, buscan un pequeño empujón de
          confianza para elegir sus números.
        </p>
        <p className="frase-final">
          <em>Una inversión simbólica. Una señal para tu suerte.</em>
        </p>
        <button className="btn close-btn" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ValorModal;