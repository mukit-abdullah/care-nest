import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DonationSection = styled.section`
  padding: 80px 20px;
  background-color: #0A2A22;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 30px;
  font-family: 'Playfair Display', serif;
`;

const Description = styled.p`
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const DonateButton = styled.button`
  padding: 15px 40px;
  background-color: #FFD700;
  color: #0A2A22;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFC000;
  }
`;

const Donation = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donation');
  };

  return (
    <DonationSection id="donation">
      <Container>
        <Title>Make a Donation</Title>
        <Description>
          Your generous donation helps us provide better care and support for our elderly 
          residents. Every contribution makes a difference in enhancing their quality of 
          life and enabling us to maintain and improve our facilities and services.
        </Description>
        <DonateButton onClick={handleDonateClick}>Make a Donation</DonateButton>
      </Container>
    </DonationSection>
  );
};

export default Donation;
