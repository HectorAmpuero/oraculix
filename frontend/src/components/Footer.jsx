import React, { useState } from "react";
import ValorModal from "./ValorModal";

const Footer = () => {
  const [showValor, setShowValor] = useState(false);

  return (
    <footer className="footer">
      <p>Los números hablan. Escúchalos.</p>
      <p>© 2025 Oraculix. Todos los derechos reservados.</p>
      <p>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          setShowValor(true);
        }}>
          ¿Por qué tiene un valor?
        </a>
      </p>

      <ValorModal isOpen={showValor} onClose={() => setShowValor(false)} />
    </footer>
  );
};

export default Footer;