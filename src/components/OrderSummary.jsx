import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ total }) => {
    const navigate = useNavigate();

    return (
        <div className="order-summary">
            <h2>Resumo do pedido</h2>
            <div className="summary-details">
                <div className="summary-row">
                    <span>Total</span>
                    <span>R${total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="summary-row">
                    <span>Frete</span>
                    <span className="shipping-note">Calculado na próxima etapa</span>
                </div>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
                <span>Total</span>
                <span>R${total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button className="checkout-button" onClick={(e) => { e.preventDefault(); navigate('/checkout')}}>
                Continuar compra
            </button>
        </div>
    );
}

export default OrderSummary;