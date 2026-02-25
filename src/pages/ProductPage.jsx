import "../styles/ProductPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NumberFormattter from "../utils/NumberFormatter";

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const urlParams = useParams();
  const [product, setProduct] = useState(null);

  // ⚡ Função para adicionar ao carrinho
  const addToCart = async (productId, quantity) => {
    try {
      const clienteId = localStorage.getItem("clienteId");

      if (!clienteId) {
        alert("Você precisa estar logado como cliente para adicionar ao carrinho!");
        return;
      }

      const response = await fetch(
        `http://localhost:8080/carrinhos/${clienteId}/adicionar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ produtoId: productId, quantidade: quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao adicionar ao carrinho");
      }

      const data = await response.json();
      const ultimoItem = data.itens[data.itens.length - 1];

      // Aqui usamos a propriedade do DTO
      alert(`Produto '${ultimoItem.nomeProduto}' adicionado ao carrinho!`);

      console.log("Carrinho atualizado:", {
        id: data.id,
        valorTotal: data.valorTotal,
        itens: data.itens.map(i => ({
          produtoId: i.produtoId,
          nome: i.nomeProduto,
          quantidade: i.quantidade,
          preco: i.preco
        }))
      });
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      alert("Erro ao adicionar ao carrinho");
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/produtos/${urlParams.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Produto não encontrado");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        console.error("Erro ao buscar produto:", err);
        setProduct(null);
      });
  }, [urlParams.id]);

  // Pegar nome do vendedor
  console.log("produto: ", product);

  if (!product) {
    return <h2>Carregando produto...</h2>;
  }

  return (
    <div className="product-page">
      <h2 className="breadcrumb">DETALHE PRODUTO</h2>
      <div className="product-container">
        <div className="product-image">
          {product.imagemBase64 ? (
            <img src={product.imagemBase64} alt={product.nome} />
          ) : (
            <div className="placeholder"></div>
          )}
        </div>

        <div className="product-details">
          <h1 className="product-title">
            {product.nome}
            <span className="external-icon">↗</span>
          </h1>
          <p className="product-price">
            R$ {NumberFormattter.format(product.preco)}
          </p>
          <p className="product-description">{product.descricao}</p>

          <div className="action-row">
            <button
              className="add-to-cart"
              onClick={() => addToCart(product.id, quantity)}
            >
              Adicionar ao carrinho
            </button>
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
