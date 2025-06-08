import "./navbar.css";
import CartWidget from "./CartWidget";
import { Link } from "react-router-dom";

function NavBar () {
  return (
    <div className="navbar">

      <div className="titulos">
          <h1>NatUraL</h1>
        <div className="subtitle">
          <h2> Beauty & Skincare </h2>
        </div>
      </div>
    
    <div className="navigation-area">
      <div className="sectionsNav"> 
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/category/cosmetics">Cosmetics</Link></li>
          <li><Link to="/category/hair">Hair</Link></li>
          <li><Link to="/category/body">Body</Link></li>
        </ul>
      </div>  
        
       <Link to="/cartView">
          <CartWidget/>
        </Link>
      </div>
    </div> 

    
  );
}
  
  export default NavBar;