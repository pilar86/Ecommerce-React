import { useContext } from 'react';
import "./cartWidget.css";
import { cartContext } from "../../context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";


function CartWidget() {

    const { getItemQuantity } = useContext (cartContext)

    return (
        <div className="cart-icon">  
        <FontAwesomeIcon icon={faCartArrowDown}/>
        <span className="cartQ">{getItemQuantity()}</span>
        </div>
    );
}

export default CartWidget;