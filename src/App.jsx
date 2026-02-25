import './styles/App.css';

import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import MiniHeaderLayout from './components/MiniHeaderLayout';
import AddAddress from "./components/AddAddress";

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ReviewsPage from './pages/ReviewsPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import SellerPage from './pages/SellerPage';
import SellerAddPage from './pages/SellerAddPage';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HomePage />
          </>
        }
        />

        <Route element={<MiniHeaderLayout />}>
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/novo-endereco" element={<AddAddress />} />
          <Route path="/pagamento" element={<PaymentPage />} />
          <Route path="/seller/:sellerId" element={<SellerPage />} />
          <Route path="/seller/add" element={<SellerAddPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;