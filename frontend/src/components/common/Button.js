import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.variant === 'outline' ? 'transparent' : '#FFD700'};
  color: ${props => props.variant === 'outline' ? '#FFD700' : '#0A2A22'};
  border: ${props => props.variant === 'outline' ? '2px solid #FFD700' : 'none'};
  padding: ${props => props.size === 'large' ? '15px 40px' : '10px 20px'};
  border-radius: 5px;
  font-size: ${props => props.size === 'large' ? '1.2rem' : '1rem'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${props => props.variant === 'outline' ? '#FFD700' : '#FFC000'};
    color: #0A2A22;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  onClick,
  disabled,
  type = 'button',
  ...props 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
