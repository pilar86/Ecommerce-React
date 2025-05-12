import { useContext, useState } from 'react';
import { cartContext } from "../../context/cartContext";
import { buyOrder } from "../../services/firestore"; // Asegurate que esta función esté bien definida
import "./checkoutForm.css";

export default function CheckoutForm({ onOrderComplete }) {
  const { cart, getTotalPrice } = useContext(cartContext);

  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // ✅ Maneja el envío del formulario
  function handleCheckout(event) {
    event.preventDefault();

    const orderData = {
      buyer: dataForm,
      items: cart,
      date: new Date(),
      total: getTotalPrice(),
    };

    // ✅ Creamos la orden en Firebase y notificamos al componente padre con el ID
    buyOrder(orderData).then((orderId) => {
      onOrderComplete(orderId);
    });
  }

 
  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setDataForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div className="form-container">
      <form onSubmit={handleCheckout}>
        <div className="form-item">
          <label htmlFor="name">Nombre</label>
          <input
            value={dataForm.name}
            onChange={inputChangeHandler}
            name="name"
            type="text"
            placeholder="Ingrese su Nombre"
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="phone">Teléfono</label>
          <input
            value={dataForm.phone}
            onChange={inputChangeHandler}
            name="phone"
            type="text"
            placeholder="Ingrese su Teléfono"
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            value={dataForm.email}
            onChange={inputChangeHandler}
            name="email"
            type="email"
            placeholder="Ingrese su Email"
            required
          />
        </div>

        {(!dataForm.name || !dataForm.phone || !dataForm.email) && (
          <p className="warning-text">* Por favor, completá todos los campos para finalizar la compra.</p>
        )}

        <button
          className="btn-secondary"
          disabled={!dataForm.name || !dataForm.phone || !dataForm.email}
          type="submit"
        >
          Finalizar Compra
        </button>
      </form>
    </div>
  );
}


/*
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../context/cartContext";
import { buyOrder } from "../../services/firestore";
import "./checkoutForm.css";

function CheckoutForm({ onOrderComplete }) {
  const [dataForm, setDataForm] = useState({ name: "", phone: "", email: "" });
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useContext(cartContext);

  function handleCheckout(event) {
    event.preventDefault();

    const orderData = {
      buyer: dataForm,
      items: cart,
      date: new Date(),
      total: getTotalPrice(),
    };

    buyOrder(orderData).then((orderid) => {
      onOrderComplete(orderid); 
      navigate(`/checkout/${orderid}`);
    });
  }

  function inputChangeHandler(event) {
    const { name, value } = event.target;
    setDataForm({ ...dataForm, [name]: value });
  }

  return (
    
      <form onSubmit={handleCheckout}>
        <div className="form-item">
          <label>Nombre</label>
          <input
            name="name"
            type="text"
            value={dataForm.name}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="form-item">
          <label>Teléfono</label>
          <input
            name="phone"
            type="text"
            value={dataForm.phone}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <div className="form-item">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={dataForm.email}
            onChange={inputChangeHandler}
            required
          />
        </div>

        <button className="btn-tertiary" type="submit">
          Confirmar compra
        </button>
      </form>
    
  );
}

export default CheckoutForm;
*/