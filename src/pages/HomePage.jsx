import "../styles/HomePage.css";
import ProductList from "../components/ProductList";

export default function HomePage() {
  return (
    <main className="home">
      <h1>Produtos em Destaque</h1>
      <ProductList />
    </main>
  );
}
