import React from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 1.5rem;
`;

const StatCard = styled.div`
  background: linear-gradient(90deg, #8EB15C 0%, #D2E6B5 100%);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-3px);
  }
  
  .number {
    font-size: 2rem;
    font-weight: bold;
    color: ${colors.text.dark};
    margin-bottom: 0.3rem;
    font-family: ${fonts.secondary};
  }
  
  .label {
    color: ${colors.text.dark};
    font-size: 0.9rem;
    font-family: ${fonts.secondary};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
          <div className="number">{stat.number}</div>
          <div className="label">{stat.label}</div>
        </StatCard>
      ))}
    </StatsContainer>
  );
};

export default DashboardStats;
