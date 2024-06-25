
import { useContext } from "react";
import Navbar from "../components/Navbar";
import { PizzasContext } from "../context/PizzaProvider";
import { formatoNumero } from "../formatoNumero.js";

const Carrito = () => {
  const { cart, setCart, addToCart, getTotalPrice } = useContext(PizzasContext);

  const removeFromCart = (pizza) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((item) => item.id === pizza.id);
      if (pizzaInCart.quantity === 1) {
        return prevCart.filter((item) => item.id !== pizza.id);
      } else {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const deleteFromCart = (pizza) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== pizza.id));
  };

  return (
    <>
      <Navbar />
      <div className="container bg-light">
        <p>Detalles del pedido</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Nombre</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Eliminar</th>
              <th scope="col">Precio</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <img className="imagen-pizza" src={item.img} alt={item.name} />
                </th>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item)}>
                    -
                  </button>
                  <button className="btn btn-outline-primary">{item.quantity}</button>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>
                    +
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => deleteFromCart(item)}>
                    Eliminar
                  </button>
                </td>
                <td>${formatoNumero(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Total: ${formatoNumero(getTotalPrice())}</h2>
        <button className="btn btn-success">Ir a pagar</button>
      </div>
    </>
  );
};

export default Carrito;
