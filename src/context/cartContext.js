import React, { useState, createContext, useContext } from "react";

const cartContext = createContext()

export const useCart = () => {
    return useContext(cartContext);
}

export default function CartContextProvider({children}) {
        const [cart, setCart] = useState([]);

        const isInCart = (id) => {
        return cart.some(item => item.id === id);
    }

    const addItem = (itemData, quantityToAdd) => { // Parámetro renombrado
        if (quantityToAdd <= 0) {
            console.warn("La cantidad a añadir debe ser mayor que cero.");
            return; // No hacer nada si la cantidad es inválida
        }

        // Asegurarse que itemData.stock es un número y es accesible
        const stockDisponible = Number(itemData.stock);
        if (isNaN(stockDisponible)) {
            console.error("Stock no disponible o inválido para el item:", itemData.title);
            alert(`No se pudo añadir ${itemData.title} porque la información de stock no es válida.`);
            return;
        }

        const productInCart = cart.find(prod => prod.id === itemData.id);

        if (productInCart) {
            const newQuantityInCart = productInCart.quantity + quantityToAdd;
            if (newQuantityInCart > stockDisponible) {
                alert(`No puedes añadir ${quantityToAdd} más de ${itemData.title}. Stock disponible: ${stockDisponible}, ya tienes ${productInCart.quantity} en el carrito.`);
                
                return;
            }
            // Actualizar la cantidad del producto existente
            const updatedCart = cart.map(prod =>
                prod.id === itemData.id ? { ...prod, quantity: newQuantityInCart } : prod
            );
            setCart(updatedCart);
        } else {
            // Añadir nuevo producto
            if (quantityToAdd > stockDisponible) {
                alert(`No puedes añadir ${quantityToAdd} de ${itemData.title}. Stock disponible: ${stockDisponible}.`);
                // Opcionalmente, añadir solo hasta el límite del stock
                // if (stockDisponible > 0) {
                //    const newItem = { ...itemData, quantity: stockDisponible };
                //    setCart(prevCart => [...prevCart, newItem]);
                //    alert(`Se añadieron ${stockDisponible} unidades de ${itemData.title} (stock máximo).`);
                // }
                return;
            }
            const newItem = {
                ...itemData, // id, title, price, img, stock, etc.
                quantity: quantityToAdd // Propiedad renombrada y asignada
            };
            setCart(prevCart => [...prevCart, newItem]);
        }
    }

    const emptyCart = () => {
        setCart([]);
    }

    const deleteItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }

    // Función renombrada y usa 'item.quantity'
    const getItemQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    // Usa 'item.quantity'
    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

    return (
        <cartContext.Provider value={{
            cart,
            addItem,
            emptyCart,
            deleteItem,
            getItemQuantity, // Exportar con el nombre corregido
            getTotalPrice,
            isInCart
        }}>
            {children}
        </cartContext.Provider>
    );
}

// Exportar el contexto para poder usarlo con useContext directamente si no se usa el hook personalizado
export { cartContext };
/*
    const addItem = (item, quantity) => {

        const newItem = {
            ...item,
            quantity
        } 
        if (isInCart(newItem.id)) {
            const findProduct = cart.find(data => data.id === newItem.id)
            const productIndex = cart.indexOf(findProduct)
            const auxArray = [...cart] 
            auxArray[productIndex].qantty += quantity
            setCart(auxArray)
        } else {
            setCart([...cart, newItem])
        }
    }       
       

    

    const emptyCart = () => {
        return setCart([])
    }

    const deleteItem = (id) => {
        return setCart(cart.filter(data => data.id !== id))
    }

    const getItemQuantity = () => {
        return cart.reduce((acc, data) => acc += data.quantity, 0)
    }

    const getTotalPrice = () => {
        return cart.reduce((acc, data) => acc += data.price * data.quantity, 0)
    }

    return(

        <cartContext.Provider value ={{cart, addItem, isInCart, emptyCart, deleteItem, getItemQuantity, getTotalPrice}}>{children}</cartContext.Provider>
     );
}

export  { cartContext } 

*/
