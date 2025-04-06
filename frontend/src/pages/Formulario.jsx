import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles.css";

const Formulario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    nacimiento: "",
    personaQuerida: "",
    fechaImportante: "",
    deseos: "",
  });

  const generarNumerosUnicos = (cantidad, max) => {
    const numeros = new Set();
    while (numeros.size < cantidad) {
      const num = Math.floor(Math.random() * max) + 1;
      numeros.add(num);
    }
    return Array.from(numeros);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numerosPrincipales = generarNumerosUnicos(6, 41);
    const numerosComplementarios = generarNumerosUnicos(14, 25);

    const payload = {
      ...formData,
      numerosPrincipales,
      numerosComplementarios,
    };

    try {
      // Guardar los datos en localStorage (temporal)
      localStorage.setItem("lecturaFormulario", JSON.stringify(payload));

      // Crear preferencia de Mercado Pago
      const response = await fetch("http://localhost:3001/api/pago/crear-preferencia", {
        method: "POST",
      });

      const data = await response.json();

      if (data.id) {
        // Redirigir al Checkout Pro de Mercado Pago
        window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("Hubo un error al generar el enlace de pago.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="formulario-container">
      <div className="info-signos">
        <h2>Y ESTOS SON LOS SIGNOS PARA DESCUBRIRLO</h2>
        <p>Para descubrir tu número, necesitamos conocer algunos aspectos clave de tu vida.</p>
        <ul>
          <li><strong>Tu nombre completo</strong> – La vibración de tu identidad.</li>
          <li><strong>Tu fecha de nacimiento</strong> – La energía que te acompaña desde el inicio.</li>
          <li><strong>El nombre de una persona querida</strong> – Aquellos que marcan tu camino.</li>
          <li><strong>Una fecha importante</strong> – Momentos que dejaron huella en tu historia.</li>
          <li><strong>Tus deseos más profundos</strong> – Lo que anhelas atraer a tu vida.</li>
        </ul>
        <p>Con estos datos, descifraremos los números que resuenan con tu destino y te revelaremos su significado.</p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-box">
        <h2>COMPLETA TU INFORMACIÓN</h2>

        <label>Nombre completo</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Fecha de nacimiento</label>
        <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} required />

        <label>Nombre de una persona querida</label>
        <input type="text" name="personaQuerida" value={formData.personaQuerida} onChange={handleChange} required />

        <label>Fecha importante</label>
        <input type="date" name="fechaImportante" value={formData.fechaImportante} onChange={handleChange} required />

        <label>¿Qué deseas atraer?</label>
        <textarea name="deseos" value={formData.deseos} onChange={handleChange} required />

        <button type="submit" className="btn">Descubrir mis números</button>
      </form>
    </div>
  );
};

export default Formulario;
