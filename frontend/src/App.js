import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Testimonial from './components/Testimonial';
import Donation from './components/Donation';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import GalleryPage from './pages/GalleryPage';
import AccommodationPage from './pages/AccommodationPage';
import MedicalCarePage from './pages/MedicalCarePage';
import PersonalCarePage from './pages/PersonalCarePage';
import ActivitiesPage from './pages/ActivitiesPage';
import DonationPage from './pages/DonationPage';
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
import GlobalStyles from './theme/GlobalStyles';

const AppContainer = styled.div`
  background-color: #0A2A22;
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
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
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
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/personal" 
            element={
              <ProtectedRoute>
                <PersonalPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/medical" 
            element={
              <ProtectedRoute>
                <MedicalPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/diet" 
            element={
              <ProtectedRoute>
                <DietPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/room" 
            element={
              <ProtectedRoute>
                <RoomPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/guardian" 
            element={
              <ProtectedRoute>
                <GuardianPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/registration/financial" 
            element={
              <ProtectedRoute>
                <FinancialPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/meal" 
            element={
              <ProtectedRoute>
                <MealPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/transaction" 
            element={
              <ProtectedRoute>
                <TransactionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/personal" 
            element={
              <ProtectedRoute>
                <PersonalInfoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/medical" 
            element={
              <ProtectedRoute>
                <MedicalInfoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/diet" 
            element={
              <ProtectedRoute>
                <DietInfoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/room" 
            element={
              <ProtectedRoute>
                <RoomInfoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/guardian" 
            element={
              <ProtectedRoute>
                <GuardianInfoPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/info/financial" 
            element={
              <ProtectedRoute>
                <FinancialInfoPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
