import '../styles/SellerPage.css';

import ProductCard from '../components/ProductCard';
import products from '../placeholders/products.js';
import { useParams } from 'react-router-dom';

export default function SellerPage() {
  const { sellerId } = useParams();
  
  // Converter sellerId para número antes de filtrar
  const sellerProducts = products.filter((p) => p.sellerId === Number(sellerId));
  
  return (
    <main className="seller-page-home">
      <h1>Seus Produtos</h1>
      <div className="product-grid">
        {sellerProducts.length > 0 ? (
          sellerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))
        ) : (
          <p>Este vendedor ainda não possui produtos cadastrados.</p>
        )}
      </div>
    </main>
  );
}