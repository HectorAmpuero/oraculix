import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-fondo.png";

const Navbar = ({ openLogin }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Oraculix Logo" className="logo" />
      </Link>

      <div className="nav-links">
        {user ? (
          <Link to="/cuenta">Mi cuenta</Link>
        ) : (
          <>
            <Link to="/registro">Registro</Link>
            <button onClick={openLogin}>Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;