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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarNumerosUnicos = (cantidad, max) => {
    const numeros = new Set();
    while (numeros.size < cantidad) {
      const num = Math.floor(Math.random() * max) + 1;
      numeros.add(num);
    }
    return Array.from(numeros);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const numerosPrincipales = generarNumerosUnicos(6, 41);
    const numerosComplementarios = generarNumerosUnicos(14, 25);

    const payload = {
      ...formData,
      numerosPrincipales,
      numerosComplementarios,
    };

    try {
      // Este es el localStorage que espera PagoExitoso.jsx
      localStorage.setItem("lecturaFormulario", JSON.stringify(payload));

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pago/crear-preferencia`, {
        method: "POST",
      });

      const data = await response.json();

      if (data.id) {
        window.location.href = `https://www.mercadopago.cl/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert("Hubo un error al generar el enlace de pago.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error inesperado.");
      setLoading(false);
    }
  };

  return (
    <div className="formulario-container">
      <div className="info-signos">
        <h2>¡Hay signos en tus números!</h2>
        <p>Para descubrir tus números, necesitamos conocer algunos aspectos clave de tu vida.</p>
        <ul>
          <li><strong>Tu nombre completo</strong> 🔎 la vibración de tu identidad.</li>
          <li><strong>Tu fecha de nacimiento</strong> 🌞 la energía que te acompaña desde el inicio.</li>
          <li><strong>Una persona que admiras</strong> 👤 Aquello que marca un ideal para ti.</li>
          <li><strong>Una fecha que no olvidas</strong> 🕰️ Momentos que dejan huella en tu historia.</li>
          <li><strong>Tus deseos más profundos</strong> 💫 lo que anhelas atraer a tu vida.</li>
        </ul>
        <p>Con esta información, descifraremos los números que resuenan con tu destino y te revelaremos su significado. 🔮</p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-box">
        <h3>COMPLETA TU INFORMACIÓN 🔐</h3>

        <label>Nombre completo:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Fecha de nacimiento:</label>
        <input type="date" name="nacimiento" value={formData.nacimiento} onChange={handleChange} required />

        <label>Nombre de una persona querida:</label>
        <input type="text" name="personaQuerida" value={formData.personaQuerida} onChange={handleChange} required />

        <label>Fecha importante:</label>
        <input type="date" name="fechaImportante" value={formData.fechaImportante} onChange={handleChange} required />

        <label>¿Qué deseas con más fuerza?</label>
        <input type="text" name="deseos" value={formData.deseos} onChange={handleChange} required />

        <button type="submit" className="btn">
          {loading ? "Descubriendo tus números..." : "Descubrir mis números"}
        </button>
      </form>
    </div>
  );
};

export default Formulario;

