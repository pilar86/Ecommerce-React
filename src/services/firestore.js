// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCA4VRQCc7aASI8V8i4HSTw0SQiXMcyH8E",
  authDomain: "e-commerce-pilar.firebaseapp.com",
  projectId: "e-commerce-pilar",
  storageBucket: "e-commerce-pilar.appspot.com",
  messagingSenderId: "237589714922",
  appId: "1:237589714922:web:701d4b40ce9d9ade3f4493"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export async function getItems() {
    const coleccion = collection(firestore, "cosmética natural");
    const q = query(coleccion, orderBy("id", "asc"));
    let respuesta = await getDocs(q);
    
    let dataDocs = respuesta.docs.map((documento) => {
       let docFormateado = { ...documento.data(), id: documento.id };
        return docFormateado;
     });
    return dataDocs;
}

export async function getSingleItem(idParams) {
  try{ 
 const docRef = doc(firestore, "cosmética natural", idParams);
 const docSnapshot = await getDoc(docRef);
 return { ...docSnapshot.data(), id: docSnapshot.id };
  } catch (error) { 
    throw error;
  }
}

export async function getItemsByCategory(categoryParams) {
  const coleccion = collection(firestore, "cosmética natural");
  const queryCategory = query(coleccion, 
                                where("category", "==", categoryParams),
                                orderBy("id", "asc"));

  const respuesta = await getDocs(queryCategory);
  let dataDocs = respuesta.docs.map((documento) => {
    let docFormateado = { ...documento.data(), id: documento.id };
     return docFormateado;
  });
 return dataDocs;
}

export async function buyOrder(orderData) {
  const coleccion = collection(firestore, "orders");
  let respuesta = await addDoc(coleccion, orderData);
  
  return respuesta.id;
}

export async function dataToFirestore(){
  const data = [
    {
        id: 1,
        title:"Bálsamo Labial",
        price: 1600,
        stock:10,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips2.jpg",
    },
    {
        id: 2,
        title:"Bálsamo Labial",
        price: 1600,
        stock:12,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips3.jpg",
    },
    {
        id: 3,
        title:"Bálsamo Labial",
        price: 1600,
        stock:8,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips4.jpg",
    },
    {
        id: 4,
        title:"Bálsamo Labial",
        price: 1600,
        stock:15,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips5.jpg",
    },
    {
        id: 5,
        title:"Bálsamo Labial",
        price: 1600,
        stock:12,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips6.jpg",
    },
    {
        id: 6,
        title:"Bálsamo Labial",
        price: 1600,
        stock:12,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/lips7.jpg",
    },
    {
        id: 7,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:19,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil1.jpg",
    },
    {
        id: 8,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:15,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil2.jpg",
    },
    {
        id: 9,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:15,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil3.jpg",
    },
    {
        id: 10,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:15,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil4.jpg",
    },
    {
        id: 11,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:8,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil5.jpg",
    },
    {
        id: 12,
        title:"Esencia Aromaterapia",
        price: 950,
        stock:8,
        category: "cosmetics",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/oil6.jpg",
    },
    {
        id: 13,
        title:"Jabón corporal",
        price: 600,
        stock:10,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap1.jpg",
    },
    
    {
        id: 14,
        title:"Jabón corporal",
        price: 600,
        stock:10,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap3.jpg",
    },
    {
        id: 15,
        title:"Jabón corporal",
        price: 600,
        stock:12,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap4.jpg",
    },
    {
        id: 16,
        title:"Jabón corporal",
        price: 600,
        stock:12,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap5.jpg",
    },
   
    {
        id: 17,
        title:"Jabón corporal",
        price: 600,
        stock:9,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap8.jpg",
    },
    {
        id: 18,
        title:"Jabón corporal",
        price: 600,
        stock:10,
        category: "body",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/soap9.jpg",
    },
    {
        id: 19,
        title:"Shampoo y Crema",
        price: 1470,
        stock:13,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair1.jpg",
    },
    {
        id: 20,
        title:"Tintura",
        price: 2300,
        stock:17,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair2.jpg",
    },
    {
        id: 21,
        title:"Aceite reparador",
        price: 1890,
        stock:12,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair3.jpg",
    },
    {
        id: 22,
        title:"Shampoo",
        price: 1200,
        stock:9,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair4.jpg",
    },
    {
        id: 23,
        title:"loción para Peinar",
        price: 1600,
        stock:11,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair6.jpg",
    },
    {
        id: 24,
        title:"Kit Reparación",
        price: 2800,
        stock:23,
        category: "hair",
        detail: "producto 100% origen vegetal",
        img: "/assets/productos/img/hair5.jpg",
    },
    
  ];

  const coleccion = collection(firestore, "cosmética natural");

  for (let item of data){
    
      const newDoc = await addDoc(coleccion, item)
      console.log("Doc created", newDoc.id)
  }

}
export default firestore;