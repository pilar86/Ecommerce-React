import React from 'react';
import Item from "../Productos/Item"; 
import "./itemList.css";

function ItemList({ data }) {

    if (!Array.isArray(data) || data.length === 0) {
    
        return <p className="no-products-message">No hay productos disponibles para mostrar.</p>;
    }

    return (
        <div className="cards-container">
            {data.map((item) => {
            
                if (!item || typeof item.id === 'undefined') {
                 
                    return null;
                }
                return (
                    <Item
                        key={item.id}
                        id={item.id}
                        img={item.img}
                        title={item.title}
                        price={item.price}
                        
                    />
                );
            })}
        </div>
    );
}

export default ItemList;