import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding-bottom: 8rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
`;

const WelcomeText = styled.div`
  font-family: 'Istok Web';
  color: #FFFFFF;
  font-size: 1.5rem;
`;

const BrandName = styled.div`
  font-family: 'Istok Web';
  color: #B1CF86;
  font-size: 8rem;
  margin: 0.5rem 0 2rem;
`;

const SubtitleTop = styled.div`
  font-family: 'Istok Web';
  color: #FFFFFF;
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
`;

const SubtitleBottom = styled.div`
  font-family: 'Istok Web';
  color: #FFFFFF;
  font-size: 1.3rem;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <WelcomeText>Welcome to</WelcomeText>
        <BrandName>Care Nest</BrandName>
        <SubtitleTop>A Place of Comfort, Care, and Community for Your</SubtitleTop>
        <SubtitleBottom>Golden Years.</SubtitleBottom>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
