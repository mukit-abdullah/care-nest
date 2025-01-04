import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(10, 42, 34, 0.7), rgba(10, 42, 34, 0.7)),
              url('/images/hero-bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #FFD700;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <Title>Welcome to CareNest</Title>
        <Subtitle>A Place Where Every Senior Feels at Home</Subtitle>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
