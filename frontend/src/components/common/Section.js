import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: ${props => props.padding || '80px 20px'};
  background-color: ${props => props.bgColor || '#0A2A22'};
  position: relative;
`;

const Container = styled.div`
  max-width: ${props => props.maxWidth || '1200px'};
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 50px;
  font-family: 'Playfair Display', serif;
`;

const Section = ({ 
  children, 
  title, 
  id, 
  bgColor, 
  padding,
  maxWidth,
  ...props 
}) => {
  return (
    <StyledSection id={id} bgColor={bgColor} padding={padding} {...props}>
      <Container maxWidth={maxWidth}>
        {title && <Title>{title}</Title>}
        {children}
      </Container>
    </StyledSection>
  );
};

export default Section;
