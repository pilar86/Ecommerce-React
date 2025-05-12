import React, { useContext, useState } from 'react';
import ItemCount from "../ItemCount/ItemCount";
import { cartContext } from "../../context/cartContext";
import { Link } from 'react-router-dom'
import './itemDetail.css';

function ItemDetail({ data }) {
  const [item, setItem ] = useState(false)
  const { addItem } = useContext(cartContext);

  const onAddToCart = (qantty) => {
    addItem(data, qantty)
    setItem(true);
  }

  return (
    <div className="product-card">
      
      <div className="product-img"> 
        <img src={data.img} alt={data.title}/>
      </div>

      <div className="product-info">
        <h4>{data.title}</h4>
        <p>{data.detail}</p>
        <p className="price">${data.price}</p>

        <div className="product-actions">
          <div className="counter">
            {item === false ? (
            <ItemCount qantty={1} stock={data.stock} onAddToCart={onAddToCart}/> 
            ) : (
              <Link to={"/cartView"}>
              <button className='btn-primary'>Ver carrito</button>
              </Link>
            )}
              <Link to={"/home"}>
            <button className='btn-secondary'>Seguir Comprando</button></Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ItemDetail;