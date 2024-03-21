import './App.css';
import { useState, useEffect } from "react";

//custom hook
import { useFetch } from './hooks/useFetch';



const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  //custom hook
  const {data: items, httpConfig, loading} = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  //resgatando dados - da onde? = url base "http://localhost:3000/products"
 // useEffect(() => {
//  const fetchData = async () => {
//   try {
//       const res = await fetch(url);
//       const data = await res.json();
//        setProducts(data);
//    } catch (error) {
//      console.error('Erro ao buscar dados:', error);
//    }
//   };

//   fetchData();
//}, []);

  // add de produtos
  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name,
      price,
    };
    
    /*
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    // carregamento dinâmico 
    const addedProduct = await res.json();

    setProducts((prevProducts) =>[...prevProducts, addedProduct ]); */

    //refatorando POST

    httpConfig(product,"POST")

    setName("");
    setPrice("");

  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/*LOADING*/}
      {loading && <p>Carregando dados...</p>}
      {!loading && <ul>
      {items && items.map((product) => (
        <li key={product.id}>{product.name} - R$: {product.price}</li>
      ))}
      </ul>}
      <div className='add-product'>
        <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
              type='text'
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)}
              >
              </input>
            </label>

            <label>
              Preço:
              <input
              type='number'
              value={price}
              name='price'
              onChange={(e) => setPrice(e.target.value)}
              />
              
            </label >
           < input type='submit' value="Criar"/>
        </form>
      </div>
    </div>
  );
}

export default App;
