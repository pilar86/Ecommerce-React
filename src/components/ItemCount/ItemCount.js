import React, {useState} from 'react';
import "./itemCount.css";

export default function ItemCount({ stock, qantty,onAddToCart})  {

    const [count, setCount] = useState(qantty);
    
    const handleAdd = () => {
        setCount(count + 1);   
    }

    const handleSubstract = () => {
        setCount(count - 1);
     }

    return (
        <div className="counter-row">
            <button className="btn-count" onClick={handleSubstract} disabled={count <= 1}>-</button>
            <span>{count}</span>
            <button className="btn-count" onClick={handleAdd} disabled={count >= stock}>+</button>
  
            <div className="product-actions">
            <button className="btn-primary" disabled={stock <= 0} onClick={() => onAddToCart(count)}>
                Agregar al carrito
            </button>
        </div>
        </div>
    );
}


