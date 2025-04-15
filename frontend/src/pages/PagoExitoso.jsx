import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PagoExitoso = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const procesarLectura = async () => {
      try {
        const lecturaGuardada = localStorage.getItem("lecturaFormulario");
        if (!lecturaGuardada || lecturaGuardada === "undefined") {
          alert("No se encontraron datos para procesar la lectura.");
          return navigate("/");
        }

        const payload = JSON.parse(lecturaGuardada);

        // Paso 1: Guardar lectura en BD
        const reslectura = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lectura`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!resLectura.ok) {
          throw new Error("Error al guardar la lectura en la base de datos.");
        }

        const dataLectura = await resLectura.json();

        // Paso 2: Generar interpretación con OpenAI
        const resAI = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/interpretacion`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: payload.nombre,
            deseos: payload.deseos,
            numerosPrincipales: payload.numerosPrincipales,
            numerosComplementarios: payload.numerosComplementarios,
          }),
        });

        const dataAI = await resAI.json();

        // Paso 3: Guardar en localStorage
        localStorage.setItem("lecturaNumerologica", JSON.stringify(dataLectura.lectura));
        localStorage.setItem("resultadoNumerologico", JSON.stringify({
          principales: payload.numerosPrincipales,
          complementarios: payload.numerosComplementarios
        }));
        localStorage.setItem("interpretacionNumerologica", dataAI.interpretacion);

        // Limpia el temporal
        localStorage.removeItem("lecturaFormulario");

        // Redirige a resultados
        navigate("/resultados");
      } catch (error) {
        console.error("Error al procesar el pago exitoso:", error);
      }
    };

    procesarLectura();
  }, [navigate]);

  return (
    <div className="resultados-container">
      <h2>Procesando tu lectura numerológica...</h2>
      <p>Por favor, espera unos segundos mientras generamos tu lectura personalizada.</p>
    </div>
  );
};

export default PagoExitoso;

