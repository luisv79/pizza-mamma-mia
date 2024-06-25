// src/context/PizzaProvider.jsx

import { createContext, useEffect, useState } from "react";

// Creación del context
export const PizzasContext = createContext();

// Provider con la fuente de datos
const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getPizzas();
  }, []);

  // Obtener las pizzas
  const getPizzas = async () => {
    const res = await fetch("/pizzas.json");
    const pizzas = await res.json();
    setPizzas(pizzas);
  };

  // Función para agregar al carrito
  const addToCart = (pizza) => {
    setCart((prevCart) => {
      const pizzaInCart = prevCart.find((item) => item.id === pizza.id);
      if (pizzaInCart) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });
  };

  // Función para obtener el total del precio en el carrito
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <PizzasContext.Provider
      value={{ pizzas, cart, addToCart, getTotalPrice, setCart }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
