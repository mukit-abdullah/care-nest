import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonationSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  position: relative;
  padding-top: 210px;

`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 60px;
  }
`;

const LeftContent = styled.div`
  text-align: center;
  flex: 1;
  max-width: 600px;
  
  margin-bottom: 30px;
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

const StatisticsContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 480px;
  height: 380px;
`;

const StatCircle = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${props => props.gradient};
  border: 3px solid #D2E6B5;
  box-shadow: 15px 14px 15px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:nth-child(1) {
    top: 0;
    right: 0;
  }

  &:nth-child(2) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:nth-child(3) {
    bottom: 0;
    left: 0;
  }
`;

const StatLabel = styled.div`
  position: absolute;
  top: -40px;
  width: 100%;
  text-align: center;
  color: #D2E6B5;
  font-size: 1rem;
  font-weight: bold;
  opacity: 50%;
  transition: opacity 0.3s ease;
`;

const StatValue = styled.div`
  color: #0A2A22;
  font-size: 1.02rem;
  font-weight: bold;
  text-align: center;
`;

const Donation = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    topDonors: [
      { name: '', amount: 0 },
      { name: '', amount: 0 },
      { name: '', amount: 0 }
    ],
    totalDonations: 0
  });

  useEffect(() => {
    const fetchDonationStats = async () => {
      try {
        const response = await axios.get('/api/donations');
        const donations = response.data;
        
        // Calculate total donations
        const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
        
        // Sort donations by amount in descending order and get top 3
        const sortedDonations = [...donations].sort((a, b) => b.amount - a.amount);
        const topThreeDonors = sortedDonations.slice(0, 3).map(donation => ({
          name: donation.isAnonymous ? 'Anonymous' : donation.donor.name,
          amount: donation.amount
        }));

        // Ensure we always have 3 entries even if there are fewer donations
        while (topThreeDonors.length < 3) {
          topThreeDonors.push({ name: 'No donor yet', amount: 0 });
        }
        
        setStats({
          topDonors: topThreeDonors,
          totalDonations: totalDonations
        });
      } catch (error) {
        console.error('Failed to fetch donation statistics:', error);
      }
    };

    fetchDonationStats();
  }, []);

  const handleDonateClick = () => {
    navigate('/donation');
  };

  return (
    <DonationSection id="donation">
      <Container>
        <LeftContent>
          <Title>Make a Donation</Title>
          <Description>
            Your generous donation helps us provide better care and support for our elderly 
            residents. Every contribution makes a difference in enhancing their quality of 
            life and enabling us to maintain and improve our facilities and services.
          </Description>
          <DonateButton onClick={handleDonateClick}>Make a Donation</DonateButton>
        </LeftContent>

        <StatisticsContainer>
          <StatCircle gradient="linear-gradient(135deg, #D2E6B5 0%, #8EB15C 100%)">
            <StatLabel>Our Top Donors</StatLabel>
            <StatValue>{stats.topDonors[0].name}</StatValue>
            <StatValue style={{ fontSize: '0.9rem' }}>{stats.topDonors[0].amount.toLocaleString()} BDT</StatValue>
          </StatCircle>
          <StatCircle gradient="linear-gradient(135deg, #B1CF86 0%, #6B8A44 100%)">
            <StatValue>{stats.topDonors[1].name}</StatValue>
            <StatValue style={{ fontSize: '0.9rem' }}>{stats.topDonors[1].amount.toLocaleString()} BDT</StatValue>
          </StatCircle>
          <StatCircle gradient="linear-gradient(135deg, #8EB15C 0%, #4C6130 100%)">
            
            <StatValue>{stats.topDonors[2].name}</StatValue>
            <StatValue style={{ fontSize: '0.9rem' }}>{stats.topDonors[2].amount.toLocaleString()} BDT</StatValue>
          </StatCircle>
        </StatisticsContainer>
      </Container>
    </DonationSection>
  );
};

export default Donation;
