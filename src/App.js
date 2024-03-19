import './App.css';
import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  //resgatando dados - da onde? = url base "http://localhost:3000/products"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  // add de produtos
  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name,
      price,
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
  };

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {products.map((product) => (
        <li key={product.id}>{product.name} - {product.price}</li>
      ))}
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
