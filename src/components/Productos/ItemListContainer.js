import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { getItems, getItemsByCategory } from "../../services/firestore"; // Asegúrate que esta ruta es correcta
import ItemList from "../Productos/ItemList"; // ➡️ ¡LA RUTA A ItemList.js DEBE SER CORRECTA!
import { DotPulse } from '@uiball/loaders';
import "./itemListContainer.css";

function ItemListContainer() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { category } = useParams();

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const fetchDataFunction = category ? getItemsByCategory(category) : getItems();

        fetchDataFunction
            .then((responseData) => {
                setData(Array.isArray(responseData) ? responseData : []);
            })
            
            
            .finally(() => {
                setIsLoading(false);
            });
    }, [category]);

    if (isLoading) {
        return (
            <div className="loader-container-fullpage">
                <DotPulse size={80} speed={1.5} color="#07400d" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container-fullpage">
                <h4>{error}</h4>
                <Link to="/home">
                    <button className="btn-primary">Volver al Inicio</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="item-list-main-container">
            <ItemList data={data} />
        </div>
    );
}

export default ItemListContainer;

/*


            if (category === undefined) {
            getItems()
            .then((respDatos)=> setData(respDatos))
            .finally(() => setIsLoading(false));
        } else{
            getItemsByCategory(category)
            .then((respDatosFiltredos) => setData(respDatosFiltredos))
            .finally(()=> setIsLoading(false))
        }
        }, [category]);

        return (
            <div>
                {isLoading && <DotPulse size={80} speed={1.5} color="green"/>}
                <div className="main container">
                    <ItemList data={data}/>  
                </div>
            </div>
        );
    }

export default ItemListContainer;

    */
    
    