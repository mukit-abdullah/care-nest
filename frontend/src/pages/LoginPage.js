import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

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
  font-size: 1rem;
  
  &::placeholder {
    color: #0A2A22;
    opacity: 0.7;
  }
`;

const LoginButton = styled.button`
  background-color: #B4D434;
  color: #0A2A22;
  padding: 15px 40px;
  border: none;
  border-radius: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9CBF2D;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes, using simple validation
    // In a real application, you would validate against a backend
    if (username === 'admin' && password === 'admin123') {
      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <LoginContainer>
          <Title>Admin</Title>
          <Subtitle>Log in</Subtitle>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Username:</Label>
              <Input 
                type="text" 
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password:</Label>
              <Input 
                type="password" 
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
