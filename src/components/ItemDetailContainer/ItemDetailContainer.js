import React, {useState, useEffect }from 'react';
import {getSingleItem} from "../../services/firestore";
import './itemDetailContainer.css';
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";

export const ItemDetailContainer = () =>  {
   
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect (()=> {
        getSingleItem(id)
        .then((respuestaDatos)=> setData(respuestaDatos))
        
    }, [id]);

    return(
        <div className='selected-product'> 
         <ItemDetail data = {data}/>  
         </div>        
    );
}

export default ItemDetailContainer;