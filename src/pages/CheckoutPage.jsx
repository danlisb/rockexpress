import "../styles/CheckoutPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormatter from "../utils/NumberFormatter";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const clienteId = localStorage.getItem("clienteId");

  // Simulação de endereços (você pode buscar do backend depois)
  const addresses = [
    { id: 1, title: "Endereço 1", details: "Rua Tal, número 123, Pelotas/RS", price: 10 },
    { id: 2, title: "Endereço 2", details: "Av. Central, 456, Porto Alegre/RS", price: 15 },
  ];

  useEffect(() => {
    if (!clienteId) {
      alert("Você precisa estar logado para continuar o checkout.");
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
        console.error("Erro ao buscar carrinho:", error);
        setCart({ itens: [], valorTotal: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [clienteId, navigate]);

  const handleRemoveFromCart = async (produtoId) => {
    try {
      const response = await fetch(`http://localhost:8080/carrinhos/${clienteId}/remover/${produtoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCart = await response.json();
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  const handleAddAddress = () => {
    navigate("/novo-endereco");
  };

  if (loading) return <p>Carregando carrinho...</p>;

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos ao seu carrinho para continuar com o checkout.</p>
      </div>
    );
  }

  // Transformar itens do backend em objetos de produto
  const cartProducts = cart.itens.map(item => ({
    product: { 
      id: item.produtoId,
      name: item.nomeProduto,
      price: item.preco,
      images: ["https://via.placeholder.com/150"] // substitua se tiver imagens reais
    },
    quantity: item.quantidade
  }));

  // Calcular total do carrinho
  const totalPrice = cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      {/* Coluna Esquerda */}
      <div className="checkout-left">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <span className="active">Endereço</span>
          <span>Envio</span>
          <span>Pagamento</span>
        </div>

        <p>Selecione o endereço de entrega</p>

        {addresses.map((address) => (
          <div
            key={address.id}
            className={`address-card ${selectedAddress?.id === address.id ? "selected" : ""}`}
            onClick={() => setSelectedAddress(address)}
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.id === address.id}
              readOnly
            />
            <div>
              <strong>{address.title}</strong>
              <p>{address.details}</p>
            </div>
            <span className="address-price">R${NumberFormatter.format(address.price)}</span>
          </div>
        ))}

        <button className="add-address" onClick={handleAddAddress}>
          ADICIONAR NOVO ENDEREÇO
        </button>
      </div>

      {/* Coluna Direita */}
      <div className="checkout-right">
        <h3>Seu Carrinho</h3>

        {cartProducts.map(({ product, quantity }) => (
          <div className="cart-item" key={product.id}>
            <div
              className="cart-img"
              style={{
                background: `url(${product.images[0]}) no-repeat center center / contain`
              }}
            ></div>
            <div className="cart-info">
              <strong>{product.name}</strong>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFromCart(product.id);
                }}
              >
                Remover
              </a>
              <p>Quantidade: {quantity}</p>
              <p className="price">R${NumberFormatter.format(product.price * quantity)}</p>
            </div>
          </div>
        ))}

        <hr />

        <div className="cart-total">
          <div className="total-line">
            <span>Total</span>
            <span>R${NumberFormatter.format(totalPrice)}</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R${NumberFormatter.format(selectedAddress?.price || 0)}</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>
              R${NumberFormatter.format(totalPrice + (selectedAddress?.price || 0))}
            </span>
          </div>
        </div>

        <button
          className="proceed-btn"
          disabled={!selectedAddress}
          onClick={() => navigate("/pagamento")}
        >
          PROSSEGUIR
        </button>
      </div>
    </div>
  );
};

export default Checkout;
