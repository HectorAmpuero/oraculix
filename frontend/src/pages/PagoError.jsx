import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles.css";

const PagoError = () => {
  return (
    <div className="resultados-container">
      <h2>⚠️ ¡Algo salió mal con tu pago!</h2>
      <p>
        Lamentablemente, no pudimos procesar tu pago. Puede que lo hayas
        cancelado o que haya ocurrido un error.
      </p>
      <p>
        Si crees que esto fue un error, te recomendamos intentar nuevamente o
        revisar tu conexión.
      </p>
      <Link to="/formulario" className="btn">
        Reintentar el pago
      </Link>
    </div>
  );
};

export default PagoError;
