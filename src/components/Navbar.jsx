

import { useContext } from "react";
import { Link } from "react-router-dom";
import { PizzasContext } from "../context/PizzaProvider";
import ImagenCarrito from "../assets/carrito-de-compras.png";
import { formatoNumero } from "../formatoNumero.js";

const Navbar = () => {
  const { getTotalPrice } = useContext(PizzasContext);

  return (
    <div className="navbar text-white py-3">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <Link to="/" className="logo-nombre mx-1 mb-0">
            <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
          </Link>
          <Link to="/carrito" className="carrito-total">
            <div>
              <img className="icono-carrito-compras" src={ImagenCarrito} alt="" />
              <span className="total-carrito">${formatoNumero(getTotalPrice())}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
