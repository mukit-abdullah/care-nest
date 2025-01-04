import React from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  padding: 1rem;
  justify-content: center;
  width: 100%;
`;

const StatCard = styled.div`
  background: linear-gradient(90deg, #8EB15C, #D2E6B5);
  padding: 1rem;
  border-radius: 10px;
  width: 15rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    color: ${colors.text.dark};
    font-family: 'Istok Web', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${colors.text.dark};
    font-family: 'Istok Web', sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const DashboardStats = () => {
  const stats = [
    { number: '38', label: 'Residents' },
    { number: '35', label: 'Available Residents' },
    { number: '105', label: 'Meals' },
    { number: '78k', label: 'Available Donation (BDT)' },
  ];

  return (
    <StatsContainer>
      {stats.map((stat, index) => (
        <StatCard key={index}>
          <h3>{stat.label}</h3>
          <p>{stat.number}</p>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default DashboardStats;
