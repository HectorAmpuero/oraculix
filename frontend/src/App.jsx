import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Formulario from "./pages/Formulario";
import Registro from "./pages/Registro";
import Resultados from "./pages/Resultados";
import Cuenta from "./pages/Cuenta";
import LoginModal from "./components/LoginModal";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Ruta protegida
import PagoExitoso from "./pages/PagoExitoso"; // ✅ Nueva ruta para pago exitoso
import PagoError from "./pages/PagoError"; 

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="app">
      <Navbar openLogin={() => setIsLoginOpen(true)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route
          path="/registro"
          element={<Registro openLogin={() => setIsLoginOpen(true)} />}
        />
        <Route path="/resultados" element={<Resultados />} />
        
        {/* ✅ Nueva ruta para pago exitoso */}
        <Route path="/pago-exitoso" element={<PagoExitoso />} />

        <Route path="/pago-error" element={<PagoError />} />

        {/* Ruta protegida con PrivateRoute */}
        <Route
          path="/cuenta"
          element={
            <PrivateRoute>
              <Cuenta />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Modal de Login */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Footer />
    </div>
  );
}

export default App;

