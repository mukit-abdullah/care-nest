import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import colors from '../theme/colors';

const JoinSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  padding-top: 180px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 20px;
  font-family: 'istok web';
  text-align: center;
`;

const Subtitle = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const JoinButton = styled.button`
  padding: 10px 25px;
  background-color: ${colors.primary.green3};
  color: #0A2A22;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: ${colors.primary.green1};
    transform: translateY(-2px);
  }
`;

const JoinUs = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/join');
  };

  return (
    <JoinSection id="join">
      <Container>
        <Title>Join Us</Title>
        <Subtitle>
          Welcome to CareNest, where compassion meets comfort. Our elderly care home 
          provides a nurturing environment with 24/7 professional care, engaging activities, 
          and a warm community that feels just like family. Take the first step towards 
          giving your loved ones the care they deserve.
        </Subtitle>
        <JoinButton onClick={handleJoinClick}>
          Join Now
        </JoinButton>
      </Container>
    </JoinSection>
  );
};

export default JoinUs;
