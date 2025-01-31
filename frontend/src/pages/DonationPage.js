import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { GiPenguin } from 'react-icons/gi';

const PageContainer = styled.div`
  background-color: #0A2A22;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const OrganizationName = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  color: #B4D434;
  margin-bottom: 30px;
`;

const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 50px;
`;

const DonationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const DonationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  background-color: #B4D434;
  border: none;
  border-radius: 50px;
  color: #0A2A22;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.02);
    background-color: #9FBF2F;
  }

  svg {
    font-size: 1.5rem;
  }
`;

const BkashText = styled.span`
  color: #E2136E;
  font-weight: bold;
`;

const TaptapText = styled.span`
  color: #0A2A22;
  font-weight: bold;
`;

const BankText = styled.span`
  color: #0A2A22;
  font-weight: bold;
`;

const DonationPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Logo src="/images/logo.png" alt="Care Nest Logo" />
          <Title>Donate to</Title>
          <OrganizationName>Care Nest</OrganizationName>
          <Subtitle>Help Homeless Peoples</Subtitle>

          <DonationOptions>
            <DonationButton>
              <FaMoneyBillWave size={24} />
              Donate With <BkashText>Bkash</BkashText>
            </DonationButton>

            <DonationButton>
              <GiPenguin size={24} />
              Donate With <TaptapText>Taptap Send</TaptapText>
            </DonationButton>

            <DonationButton>
              <FaUniversity size={24} />
              Donate With <BankText>Bank Account</BankText>
            </DonationButton>
          </DonationOptions>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default DonationPage;
