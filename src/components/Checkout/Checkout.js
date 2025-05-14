import { useParams, Link } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { orderid } = useParams(); 

  return (
    <div className="fin-compra">
      <h3>¡Gracias Por Tu Compra!</h3>
      <h4>Te contactaremos con los datos que nos dejaste.</h4>
      <h4>Tu código de compra es: <strong>{orderid}</strong></h4>

      <Link to="/home" style={{display: "block", margin: "25px", textAlign: "center"}}>
         <button className="btn-primary">Volver al Inicio</button>
      </Link>
    </div>
  );
}