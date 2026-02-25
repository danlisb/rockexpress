import "../styles/Cart.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import "../styles/CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (!clienteId) {
      alert("Você precisa estar logado como cliente para ver o carrinho.");
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}`);
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        } else {
          setCart({ itens: [], valorTotal: 0 });
        }
      } catch (error) {
        setCart({ itens: [], valorTotal: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [clienteId, navigate]);

  const handleRemoveItem = async (produtoId) => {
    try {
      const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}/remover/${produtoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Erro na requisição de remover item:", error);
    }
  };

  const updateQuantity = async (produtoId, delta) => {
    try {
      const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}/atualizar/${produtoId}?quantidade=${delta}`, {
        method: "PUT",
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error);
    }
  };

  if (loading) return <p>Carregando carrinho...</p>;

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="empty-cart">
        <h3>Seu carrinho está vazio.</h3>
        <a onClick={(e) => { e.preventDefault(); navigate("/"); }}>Continue comprando</a>
      </div>
    );
  }

  return (
    <div className="container">
      <main className="main-content">
        <h1>Carrinho</h1>

        <div className="cart-grid">
          <div className="cart-items-container">
            {cart.itens.map((item) => (
              <CartItem
                key={item.produtoId}
                item={{ id: item.produtoId, nome: item.nomeProduto, preco: item.preco }}
                quantity={item.quantidade}
                onRemove={() => handleRemoveItem(item.produtoId)}
                onUpdateQuantity={(delta) => updateQuantity(item.produtoId, delta)}
              />
            ))}
          </div>

          <div className="order-summary-container">
            <OrderSummary total={cart.valorTotal} />
          </div>
        </div>
      </main>
    </div>
  );
}
