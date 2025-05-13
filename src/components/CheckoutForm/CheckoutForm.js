import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from "../../context/cartContext";
import { buyOrder } from "../../services/firestore";
import "./checkoutForm.css";

export default function CheckoutForm({ onOrderComplete }) {
  const { cart, getTotalPrice, emptyCart } = useContext(cartContext);
  const navigate = useNavigate(); 

  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  async function handleCheckout(event) {
    event.preventDefault();

    if (!dataForm.name || !dataForm.phone || !dataForm.email) {
      setSubmitError("Por favor, completa todos los campos.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const orderData = {
      buyer: dataForm,
      items: cart.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity 
      })),
      date: new Date(),
      total: getTotalPrice(),
    };

    try {
      const orderId = await buyOrder(orderData);

      if (orderId) {
        if (onOrderComplete) { 
          onOrderComplete(orderId);
        }
        emptyCart(); 
        navigate(`/checkout/${orderId}`); 
      } else {
        throw new Error("No se recibió un ID de orden de Firebase.");
      }
    } catch (error) {
      setSubmitError("Hubo un problema al crear tu orden. Intenta de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
          />
        </div>
        <div className="form-item">
          <label htmlFor="phone">Teléfono</label>
          <input
            value={dataForm.phone}
            onChange={inputChangeHandler}
            name="phone"
            type="tel"
            placeholder="Ingrese su Teléfono"
            required
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </div>

        {submitError && (
          <p className="error-text" style={{ color: "red", marginTop: "10px" }}>
            {submitError}
          </p>
        )}
        {(!dataForm.name || !dataForm.phone || !dataForm.email) && !submitError && (
          <p className="warning-text">* Por favor, completá todos los campos para finalizar la compra.</p>
        )}
        <button
          className="btn-tertiary" 
          disabled={isSubmitting || !dataForm.name || !dataForm.phone || !dataForm.email}
          type="submit"
        >
          {isSubmitting ? "Procesando..." : "Finalizar Compra"}
        </button>
      </form>
    </div>
  );
}