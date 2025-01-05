import React from 'react';
import styled from 'styled-components';

const ContactSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 30px;
  font-family: 'istok web';
  grid-column: 1 / -1;
  text-align: center;
`;

const ContactInfo = styled.div`
  color: #ffffff;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  svg {
    margin-right: 15px;
    color: #FFD700;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
`;

const ContactUs = () => {
  return (
    <ContactSection id="contact">
      <Container>
        <Title>Contact Us</Title>
        <ContactInfo>
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
            </svg>
            <p>123 Care Street, Comfort City, CC 12345</p>
          </InfoItem>
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <p>info@carenest.com</p>
          </InfoItem>
          <InfoItem>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <p>+1 (555) 123-4567</p>
          </InfoItem>
        </ContactInfo>
        <MapContainer>
          {/* Google Maps integration will go here */}
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
      </Container>
    </ContactSection>
  );
};

export default ContactUs;
