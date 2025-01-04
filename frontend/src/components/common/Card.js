import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  background: ${props => props.bgColor || 'rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;
  padding: ${props => props.padding || '20px'};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  ${props => props.hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  `}
`;

const CardImage = styled.img`
  width: 100%;
  height: ${props => props.imageHeight || '200px'};
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const CardTitle = styled.h3`
  color: #FFD700;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const CardContent = styled.div`
  color: #ffffff;
`;

const Card = ({ 
  children,
  title,
  image,
  imageHeight,
  imageAlt,
  bgColor,
  padding,
  hoverable = true,
  ...props 
}) => {
  return (
    <StyledCard
      bgColor={bgColor}
      padding={padding}
      hoverable={hoverable}
      {...props}
    >
      {image && (
        <CardImage 
          src={image} 
          alt={imageAlt || title} 
          imageHeight={imageHeight}
        />
      )}
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default Card;
