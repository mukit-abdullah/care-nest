import React from 'react';
import styled from 'styled-components';
import aboutUsImage from '../assets/images/Landing Page/about us.jpg';

const AboutSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
  margin-top: 170px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  color: #ffffff;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 30px;
  font-family: 'istok web';
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const AboutUs = () => {
  return (
    <AboutSection id="about">
      <Container>
        <Content>
          <Title>About Us</Title>
          <Description>
            Welcome to CareNest, where we provide exceptional care and comfort for seniors. 
            Our dedicated team of professionals ensures that every resident receives 
            personalized attention and support in a warm, home-like environment.
          </Description>
          <Description>
            With state-of-the-art facilities and a compassionate approach, we create 
            a nurturing community where seniors can thrive, socialize, and enjoy their 
            golden years with dignity and joy.
          </Description>
        </Content>
        <ImageContainer>
          <img src={aboutUsImage} alt="Caring staff with senior resident" />
        </ImageContainer>
      </Container>
    </AboutSection>
  );
};

export default AboutUs;
