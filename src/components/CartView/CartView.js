import { useContext, useState } from 'react';
import { cartContext } from "../../context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "./cartView.css";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import Checkout from "../Checkout/Checkout";

export default function CartView() {
  
  const { cart, deleteItem, emptyCart, getTotalPrice } = useContext(cartContext);

  const [showForm, setShowForm] = useState(false);

  const [orderId, setOrderId] = useState(null);

  const handleFinish = () => {
    setShowForm(true);
  };

  
  const handleOrderComplete = (id) => {
    setOrderId(id);   
    emptyCart();       
  };

  return (
    <section className="mi-carrito">
      <h2>Mi Carrito</h2>

  
      {orderId ? (
        <Checkout orderId={orderId} />
      ) : cart.length === 0 ? (
        
        <h4>Tu carrito está vacío</h4>
      ) : (
        <>
          
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.title} className="cart-item-img" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p> 
                </div>
                
                <button className="small-btn" onClick={() => deleteItem(item.id)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </li>
            ))}
          </ul>

          
          <div className="cart-summary">
            <h4>Total: ${getTotalPrice()}</h4>
          </div>

          
          {!showForm ? (
            <div className="buttons-wrapper">
              <button className="btn-primary" onClick={handleFinish}>
                Finalizar Compra
              </button>

              <Link to="/home">
                <button className="btn-secondary">Seguir Comprando</button>
              </Link>

              <button className="btn-tertiary" onClick={emptyCart}>
                Vaciar Carrito
              </button>
            </div>
          ) : (
            
            <CheckoutForm onOrderComplete={handleOrderComplete} />
          )}
        </>
      )}
    </section>
  );
}