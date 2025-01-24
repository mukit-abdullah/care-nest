import React, { useState } from 'react';
import styled from 'styled-components';
import LoginHeader from '../components/LoginHeader';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginAdmin } from '../services/authService';
import { useAdmin } from '../context/AdminContext';
import colors from '../theme/colors';

const PageContainer = styled.div`
  background-color: #0F1914;
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
  color: ${colors.primary.green5}; 
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: ${colors.primary.green5};
  margin-bottom: 50px;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2rem;
  color: ${colors.primary.green3};
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: ${colors.primary.green4};
  color: #0A2A22;
  font-size: 1rem;
  
  &::placeholder {
    color: #0A2A22;
    opacity: 0.7;
  }
`;

const LoginButton = styled.button`
  background-color: #B1CF86;
  color: #0A2A22;
  padding: 10px 25px;
  border: none;
  font-weight: bold;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9DBF70;
  }

  &:disabled {
    background-color: #B1CF86;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAdminData } = useAdmin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      console.log('Attempting login...');
      const response = await loginAdmin(username, password);
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        console.log('Login successful, updating admin data...');
        updateAdminData(response.data);
        
        // Get return path from location state or default to dashboard
        const { state } = location;
        const returnPath = state?.returnTo || '/admin/dashboard';
        
        navigate(returnPath, { 
          state: { 
            success: true,
            message: 'Login successful!'
          }
        });
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
      // Clear password field on error
      setPassword('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoginHeader />
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
                onChange={(e) => setUsername(e.target.value.trim())}
                required
                disabled={loading}
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
                disabled={loading}
              />
            </FormGroup>
            <LoginButton type="submit" disabled={loading || !username || !password}>
              {loading ? 'Logging in...' : 'Log in'}
            </LoginButton>
          </form>
        </LoginContainer>
      </PageContainer>
    </>
  );
};

export default LoginPage;
