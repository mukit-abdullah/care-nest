import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Testimonial from './components/Testimonial';
import Donation from './components/Donation';
import ContactUs from './components/JoinUs';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';
import AccommodationPage from './pages/AccommodationPage';
import MedicalCarePage from './pages/MedicalCarePage';
import PersonalCarePage from './pages/PersonalCarePage';
import ActivitiesPage from './pages/ActivitiesPage';
import DonationPage from './pages/DonationPage';
import PaymentPage from './pages/PaymentPage';
import BkashPaymentPage from './pages/BkashPaymentPage';
import TapTapPaymentPage from './pages/TapTapPaymentPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import MealPage from './pages/admin/MealPage';
import TransactionPage from './pages/admin/TransactionPage';
import PersonalPage from './pages/admin/ResidentRegistration/PersonalPage';
import MedicalPage from './pages/admin/ResidentRegistration/MedicalPage';
import DietPage from './pages/admin/ResidentRegistration/DietPage';
import RoomPage from './pages/admin/ResidentRegistration/RoomPage';
import GuardianPage from './pages/admin/ResidentRegistration/GuardianPage';
import FinancialPage from './pages/admin/ResidentRegistration/FinancialPage';
import PersonalInfoPage from './pages/admin/ResidentInfo/PersonalInfoPage';
import MedicalInfoPage from './pages/admin/ResidentInfo/MedicalInfoPage';
import DietInfoPage from './pages/admin/ResidentInfo/DietInfoPage';
import RoomInfoPage from './pages/admin/ResidentInfo/RoomInfoPage';
import GuardianInfoPage from './pages/admin/ResidentInfo/GuardianInfoPage';
import FinancialInfoPage from './pages/admin/ResidentInfo/FinancialInfoPage';
import ResidentApplicationPage from './pages/ResidentApplicationPage';
import ApplicationDetailsPage from './pages/admin/ApplicationDetailsPage';
import { AdminProvider } from './context/AdminContext';
import { ResidentRegistrationProvider } from './context/ResidentRegistrationContext';
import { ResidentProvider } from './context/ResidentContext';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0F1914;
  color: #ffffff;
`;

const MainContent = styled.main`
  padding-top: 80px;
`;

const HomePage = () => (
  <>
    <Header />
    <MainContent>
      <Hero />
      <Services />
      <AboutUs />
      <Gallery />
      <Testimonial />
      <Donation />
      <ContactUs />
    </MainContent>
    <Footer />
  </>
);

// Protected Route component for admin routes
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (!token || !userData) {
          throw new Error('No token found');
        }

        // Parse user data
        const user = JSON.parse(userData);
        
        // Check if user has admin role
        if (user.role !== 'admin' && user.role !== 'super_admin') {
          throw new Error('Not authorized');
        }

        // Verify token with backend
        const response = await axios.get('http://localhost:5000/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.data.success) {
          throw new Error('Token invalid');
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear storage and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#0F1914',
        color: '#B4D434'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Route guard for login page
const LoginRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const userData = localStorage.getItem('userData');

  if (token && userData) {
    // If already logged in, redirect to dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AdminProvider>
        <ResidentProvider>
          <ResidentRegistrationProvider>
            <GlobalStyles />
            <AppContainer>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/accommodation" element={<AccommodationPage />} />
                <Route path="/medical-care" element={<MedicalCarePage />} />
                <Route path="/personal-care" element={<PersonalCarePage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/bkash-payment" element={<BkashPaymentPage />} />
                <Route path="/taptap-payment" element={<TapTapPaymentPage />} />
                <Route path="/join" element={<ResidentApplicationPage />} />
                
                {/* Login Route - Protected from logged in users */}
                <Route 
                  path="/login" 
                  element={
                    <LoginRoute>
                      <LoginPage />
                    </LoginRoute>
                  } 
                />

                {/* Protected Admin Routes */}
                <Route path="/admin/*" element={<ProtectedRoute><AdminRoutes /></ProtectedRoute>} />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AppContainer>
          </ResidentRegistrationProvider>
        </ResidentProvider>
      </AdminProvider>
    </Router>
  );
}

// Admin routes component
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="meal" element={<MealPage />} />
      <Route path="transaction" element={<TransactionPage />} />
      <Route path="registration">
        <Route path="personal" element={<PersonalPage />} />
        <Route path="medical" element={<MedicalPage />} />
        <Route path="diet" element={<DietPage />} />
        <Route path="room" element={<RoomPage />} />
        <Route path="guardian" element={<GuardianPage />} />
        <Route path="financial" element={<FinancialPage />} />
      </Route>
      <Route path="info">
        <Route path="personal" element={<PersonalInfoPage />} />
        <Route path="medical" element={<MedicalInfoPage />} />
        <Route path="diet" element={<DietInfoPage />} />
        <Route path="room" element={<RoomInfoPage />} />
        <Route path="guardian" element={<GuardianInfoPage />} />
        <Route path="financial" element={<FinancialInfoPage />} />
      </Route>
      <Route path="applications/:id" element={<ApplicationDetailsPage />} />
    </Routes>
  );
};

export default App;
