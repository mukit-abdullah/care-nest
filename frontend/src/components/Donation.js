import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DonationSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #D2E6B5;
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
  padding: 10px 25px;
  background-color: #D2E6B5;
  color: black;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #B1CF86;
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
