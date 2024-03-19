import './App.css';
import { useState, useEffect } from "react";

const url = "http://localhost:3000/products";

function App() {

  const [products, setProducts] = useState([]);

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

  console.log(products);

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {products.map((product) => (
        <li key={product.id}>{product.name} - {product.price}</li>
      ))};
    </div>
  );
}

export default App;
