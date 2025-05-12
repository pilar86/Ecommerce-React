import './App.css';
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/Productos/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartContextProvider from './context/cartContext';
import CartView from './components/CartView/CartView';
import Checkout from './components/Checkout/Checkout';


function App() {

  return (

    <CartContextProvider> 
    <BrowserRouter> 
      <NavBar/>

      <main style={{ flex: 1 }}>
      <Routes> 
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ItemListContainer />} />
        <Route path="/category/:category" element={<ItemListContainer/>}/>
        <Route path="/body/:id" element={<ItemDetailContainer/>}/>
        <Route path="/checkout/:orderid" element={<Checkout/>}/>
        <Route path="/cartView" element={<CartView/>}/>

        <Route path="*" element={<h5>404 - Página no encontrada</h5>} />

      </Routes>
      </main>
      
      <Footer/>
    </BrowserRouter>
    </CartContextProvider>
     
  );
}
export default App;