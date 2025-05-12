import React from 'react';
import "./Item.css";
import { Link } from "react-router-dom";


function Item(props) {
    let { img, title, price } = props;
    const urlDetalle = `/body/${props.id}`;
    
    return(
        <div className="card">
            
            <div className="card-img">
                <img src={img} alt="card img"></img>
            </div>

            <div className="card-detail">
                <div className="card-info">
                    <h3>{title}</h3>
                    <h3 className="price">${price}</h3>
                </div>
            
                <div className="card-action">
                    <Link to={urlDetalle}> 
                        <button className= "btn-card-primary">Ver Más</button>
                    </Link> 
                </div>
            </div>
        </div>         
    );
}

export default Item;
