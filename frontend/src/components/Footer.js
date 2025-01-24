import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: black;
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
    color: #D2E6B5;
    font-size: 1.5rem;
    margin-bottom: 15px;
    font-family: 'istok web';
  }
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
    color: #D2E6B5;
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #B1CF86;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;

  a {
    color: #B1CF86;
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
  color: #D2E6B5;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #B1CF86;
  }
`;

const MapContainer = styled.div`
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #D2E6B5;
  margin-top: 20px;
`;

const Footer = () => {
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
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <FooterContainer id="footer">
      <FooterContent>
        <FooterSection>
          <h3>CareNest</h3>
          <p>Providing exceptional care and comfort for seniors in a warm, home-like environment.</p>
          <h3></h3><br></br>
          <h3>Contact Info</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Care Street<br />
            <i className="fas fa-phone"></i> +1 (555) 123-4567<br />
            <i className="fas fa-envelope"></i> info@carenest.com
          </p>
          <SocialLinks>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </SocialLinks>
        </FooterSection>

        <FooterSection style={{ paddingLeft: '30%' }}>
          <h3>Quick Links</h3>
          <ul>
            <li><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>Home</a></li>
            <li><a onClick={() => scrollToSection('services')} style={{ cursor: 'pointer' }}>Services</a></li>
            <li><a onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>About Us</a></li>
            <li><a onClick={() => scrollToSection('gallery')} style={{ cursor: 'pointer' }}>Gallery</a></li>
            <li><a onClick={() => scrollToSection('testimonials')} style={{ cursor: 'pointer' }}>Testimonials</a></li>
            <li><a onClick={() => scrollToSection('donation')} style={{ cursor: 'pointer' }}>Donation</a></li>
            <li><a onClick={() => scrollToSection('join')} style={{ cursor: 'pointer' }}>Join Us</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <MapContainer>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.9!3d40.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
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
