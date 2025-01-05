import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/CareNestLogo.png';

const HeaderContainer = styled.header`
  background-color: #0F1914;
  padding: 15px 40px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 50px;
  cursor: pointer;
`;

const BackToHome = styled.button`
  background: none;
  border: none;
  color: #B4D434;
  font-size: 1rem;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: 'Istok Web', sans-serif;

  &:hover {
    background-color: rgba(180, 212, 52, 0.1);
  }
`;

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo 
        src={logo} 
        alt="CareNest Logo" 
        onClick={() => navigate('/')}
      />
      <BackToHome onClick={() => navigate('/')}>
        Back to Home
      </BackToHome>
    </HeaderContainer>
  );
};

export default LoginHeader;
