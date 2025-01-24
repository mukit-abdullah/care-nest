import React from 'react';
import styled from 'styled-components';
import heroImage from '../assets/images/Landing Page/HERO SECTION.jpg';
import colors from '../theme/colors';

const HeroContainer = styled.div`
  min-height: 90vh;
  background: linear-gradient(rgba(15, 25, 20, 0.30), rgba(15, 25, 20, 1)),
    url('${heroImage}') no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  padding-bottom: 9rem;
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
  color: ${colors.primary.green1};
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