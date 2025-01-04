import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  background-color: #0A2A22;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
`;

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 60px auto;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: #B4D434;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #B4D434;
  margin-bottom: 50px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  color: #B4D434;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: #D9FFB3;
  color: #0A2A22;
  font-size: 1.1rem;

  &::placeholder {
    color: #0A2A22;
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #B4D434;
  }
`;

const LoginButton = styled.button`
  padding: 15px 40px;
  background-color: #B4D434;
  color: #0A2A22;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  margin-top: 20px;

  &:hover {
    background-color: #9FBF2F;
    transform: scale(1.02);
  }
`;

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <>
      <Header />
      <PageContainer>
        <LoginContainer>
          <Title>Admin</Title>
          <Subtitle>Log in</Subtitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Username:</Label>
              <Input 
                type="text" 
                placeholder="Enter Username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password:</Label>
              <Input 
                type="password" 
                placeholder="Enter Password"
                required
              />
            </FormGroup>
            <LoginButton type="submit">Log in</LoginButton>
          </form>
        </LoginContainer>
      </PageContainer>
    </>
  );
};

export default LoginPage;
