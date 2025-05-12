import { useParams } from "react-router-dom";

export default function Checkout() {
  const { orderid } = useParams(); 

  return (
    <div className="fin-compra">
      <h3>¡Gracias Por Tu Compra!</h3>
      <h4>Te contactaremos con los datos que nos dejaste.</h4>
      <h4>Tu código de compra es: <strong>{orderid}</strong></h4>
    </div>
  );
}