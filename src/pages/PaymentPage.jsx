import "../styles/PaymentPage.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormatter from "../utils/NumberFormatter";

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const clienteId = localStorage.getItem("clienteId");

  useEffect(() => {
    if (!clienteId) {
      alert("Você precisa estar logado para acessar a página de pagamento.");
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

  const shipping = 10; // Frete fixo
  const handleFinalize = () => {
    alert("Pagamento realizado com sucesso!");
    navigate("/"); // volta para home ou página de confirmação
  };

  if (loading) return <p>Carregando carrinho...</p>;

  if (!cart || cart.itens.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos ao seu carrinho para continuar com o pagamento.</p>
      </div>
    );
  }

  // Transformar itens do backend em produtos
  const cartProducts = cart.itens.map(item => ({
    product: { 
      id: item.produtoId,
      name: item.nomeProduto,
      price: item.preco,
      images: ["https://via.placeholder.com/150"] // substitua se tiver imagens reais
    },
    quantity: item.quantidade
  }));

  const subtotal = cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const total = subtotal + shipping;

  return (
    <div className="payment-container">
      <div className="payment-left">
        <h1>Pagamento</h1>
        <div className="checkout-steps">
          <span>Endereço</span>
          <span>Envio</span>
          <span className="active">Pagamento</span>
        </div>

        <div className="pix-section">
          <div className="pix-input">
            <img src="pix.png" alt="Pix" style={{ width: "100px", height: "auto" }} />
          </div>
          <div className="qr-code">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=pagamento"
              alt="QR Code Pix"
            />
          </div>
        </div>
      </div>

      <div className="payment-right">
        <h3>Sua compra</h3>
        {cartProducts.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <div
              className="cart-img"
              style={{ background: `url(${product.images[0]}) no-repeat center center / contain` }}
            />
            <div className="cart-info">
              <strong>{product.name}</strong>
              <p>Quantidade: {quantity}</p>
              <p className="price">R${NumberFormatter.format(product.price * quantity)}</p>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <div className="total-line">
            <span>Subtotal</span>
            <span>R${NumberFormatter.format(subtotal)}</span>
          </div>
          <div className="total-line">
            <span>Frete</span>
            <span>R${NumberFormatter.format(shipping)}</span>
          </div>
          <div className="total-line final">
            <span>Total</span>
            <span>R${NumberFormatter.format(total)}</span>
          </div>
        </div>

        <button className="finalize-btn" onClick={handleFinalize}>
          FINALIZAR PAGAMENTO
        </button>
      </div>
    </div>
  );
};

export default Payment;
