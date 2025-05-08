import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AgeVerification from './components/AgeVerification';
import PrivateRoute from './components/PrivateRoute';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [isAdult, setIsAdult] = useState<boolean>(() => {
    return localStorage.getItem('isAdult') === 'true';
  });
  const [showAgeVerification, setShowAgeVerification] = useState<boolean>(!isAdult);

  useEffect(() => {
    if (isAdult) {
      localStorage.setItem('isAdult', 'true');
    }
  }, [isAdult]);

  const handleAgeVerification = (verified: boolean) => {
    setIsAdult(verified);
    setShowAgeVerification(!verified);
  };

  if (showAgeVerification) {
    return <AgeVerification onVerify={handleAgeVerification} />;
  }

  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AdminProvider>
            <div className="flex flex-col min-h-screen bg-gray-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/catalog/:category" element={<CatalogPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/thank-you" element={<ThankYouPage />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route 
                    path="/admin/*" 
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </AdminProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;