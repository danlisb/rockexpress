import TrashIcon from "./TrashIcon";

const CartItem = ({ item, quantity, onRemove, onUpdateQuantity }) => (
  <div className="cart-item">
    <div className="cart-item-image">
      <img
        src={item.images && item.images.length > 0 ? item.images[0] : 'https://placehold.co/150x150/e2e8f0/333?text=Image'}
        alt={item.name || item.nome || "Produto"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/150x150/e2e8f0/333?text=Image';
        }}
      />
    </div>

    <div className="cart-item-details">
      <h3>{item.name || item.nome}</h3>

      <div className="quantity-controls">
        <button onClick={() => onUpdateQuantity(-1)} disabled={quantity <= 1}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onUpdateQuantity(1)}>+</button>
      </div>

      <div className="cart-item-footer">
        <p className="cart-item-price">
          R${(item.price || item.preco || 0).toFixed(2).replace('.', ',')}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="remove-item-button"
        >
          <TrashIcon />
          Remover
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;
