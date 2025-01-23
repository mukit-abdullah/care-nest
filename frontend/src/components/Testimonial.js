import React from 'react';
import styled from 'styled-components';

const TestimonialSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  padding-top: 200px;

`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 50px;
  font-family: 'istok web';
`;

const TestimonialCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(145deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
  border-radius: 20px;
  position: relative;
`;

const Quote = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 20px;
  font-style: italic;
`;

const Author = styled.p`
  color: #D2E6B5;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const LeafDecoration = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.2;
  background-image: url('/images/leaf.png');
  background-size: contain;
  background-repeat: no-repeat;

  &.top-left {
    top: -20px;
    left: -20px;
    transform: rotate(-45deg);
  }

  &.bottom-right {
    bottom: -20px;
    right: -20px;
    transform: rotate(135deg);
  }
`;

const Testimonial = () => {
  return (
    <TestimonialSection id="testimonial">
      <Title>Testimonial</Title>
      <TestimonialCard>
        <LeafDecoration className="top-left" />
        <LeafDecoration className="bottom-right" />
        <Quote>
          "The care and attention provided at CareNest is exceptional. The staff treats 
          everyone like family, and the facilities are beautiful. I couldn't be happier 
          with the care my mother receives here."
        </Quote>
        <Author>- Sarah Johnson, Resident's Daughter</Author>
      </TestimonialCard>
    </TestimonialSection>
  );
};

export default Testimonial;
