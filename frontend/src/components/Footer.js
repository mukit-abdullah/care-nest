import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #061812;
  color: #ffffff;
  padding: 60px 20px 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #FFD700;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #FFD700;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;

  a {
    color: #FFD700;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const LoginLink = styled.span`
  color: #FFD700;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #FFC000;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About CareNest</h3>
          <p>Providing exceptional care and comfort for seniors in a warm, home-like environment.</p>
          <SocialLinks>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contact Info</h3>
          <ul>
            <li>123 Care Street</li>
            <li>Comfort City, CC 12345</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Email: info@carenest.com</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for updates and news.</p>
          {/* Add newsletter form here */}
        </FooterSection>
      </FooterContent>
      <Copyright>
        &copy; {new Date().getFullYear()} CareNest. All rights reserved.
        <LoginLink onClick={handleLoginClick}>Admin Login</LoginLink>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
