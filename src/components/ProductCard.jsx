import "../styles/ProductCard.css";
import { Link } from "react-router-dom";
import NumberFormatter from "../utils/NumberFormatter";

export default function ProductCard({ product }) {
  const handleAddToCart = async () => {
    const clienteId = localStorage.getItem("clienteId");

    if (!clienteId) {
      alert("Você precisa estar logado como cliente para adicionar ao carrinho!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/carrinhos/${clienteId}/adicionar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            produtoId: product.id,
            quantidade: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao adicionar produto ao carrinho");
      }

      const data = await response.json();
      alert(`Produto '${product.nome}' adicionado ao carrinho!`);
      console.log("Carrinho atualizado:", data);
    } catch (err) {
      console.error(err);
      alert("Não foi possível adicionar ao carrinho.");
    }
  };

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="unstyled-link">
        {product.imagemBase64 !== null ? (
          <img
            src={product.imagemBase64}
            alt={product.nome}
            className="product-img"
          />
        ) : (
          <div className="product-no-img"></div>
        )}
        <h3>{product.nome}</h3>
      </Link>
      <p>R$ {NumberFormatter.format(product.preco)}</p>
      <p>
        Estoque:{" "}
        <strong>{product.estoque > 0 ? product.estoque : "Indisponível"}</strong>
      </p>
      <button onClick={handleAddToCart}>Adicionar ao carrinho</button>
    </div>
  );
}
