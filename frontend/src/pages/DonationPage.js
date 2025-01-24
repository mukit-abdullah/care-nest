import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { FaUniversity, FaMoneyBillWave } from 'react-icons/fa';
import { GiPenguin } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CareNestLogo.png';
import colors from '../theme/colors';

const PageContainer = styled.div`
  background-color: #0F1914;
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
  
  height: 100px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-family: ''istok-web';
  font-size: 3.5 rem;
  color: #D2E6B5;
  margin-bottom: 20px;
`;

const OrganizationName = styled.h2`
  font-family: 'istok-web';
  font-size:  20rem;
  color: #D2E6B5;
  margin-bottom: 30px;
  font-weight: bold;
`;

const Subtitle = styled.h3`
  font-size: 1 rem;
  color: #ffffff;
  margin-bottom: 70px;
  margin-top: 10px
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
  gap: 12px;
  padding: 15px;
  background-color: #8EB15C;
  border: none;
  border-radius: 50px;
  color: #ffffff;
  font-size: 1.2rem;
  font-family: 'istok-web';
  font-weight: bold;
  cursor: pointer;
  margin-left: 60px;
  width: 75%;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: scale(1.02);
    background-color: ${colors.primary.green2};
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
  color: #334f0a;
  font-weight: bold;
`;

const BankText = styled.span`
  color: #000000;
  font-weight: bold;
`;

const DonationPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <Logo src={logo} />
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

            <DonationButton onClick={() => navigate('/payment')}>
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
