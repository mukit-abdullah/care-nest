import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/medical-care" element={<MedicalCarePage />} />
          <Route path="/personal-care" element={<PersonalCarePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<DashboardPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
