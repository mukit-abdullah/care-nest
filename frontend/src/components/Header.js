import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/CareNestLogo.png';

const HeaderContainer = styled.header`
  background-color: black;
  padding: 15px 40px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(10, 42, 34, 0.95);
    padding: 20px;
    gap: 15px;
  }
`;

const NavLink = styled.div`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 5px 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    color: #8EB15C;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #8EB15C;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }

  &.active::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Logo 
        src={logo} 
        alt="CareNest Logo" 
        onClick={handleLogoClick}
      />
      <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <i className="fas fa-bars"></i>
      </MobileMenuButton>
      <Nav isOpen={isMenuOpen}>
        <NavLink onClick={() => handleLogoClick()}>Home</NavLink>
        <NavLink onClick={() => scrollToSection('services')}>Services</NavLink>
        <NavLink onClick={() => scrollToSection('about')}>About Us</NavLink>
        <NavLink onClick={() => location.pathname === '/gallery' ? navigate('/') : scrollToSection('gallery')}>Gallery</NavLink>
        <NavLink onClick={() => scrollToSection('testimonial')}>Testimonial</NavLink>
        <NavLink onClick={() => scrollToSection('donation')}>Donation</NavLink>
        <NavLink onClick={() => scrollToSection('contact')}>Contact Us</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
