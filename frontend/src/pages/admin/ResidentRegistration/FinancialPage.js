import React from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
  overflow-x: hidden;
`;

const TopSection = styled.div`
  background-color: #000000;
  width: 100%;
  margin-bottom: 2rem;
  padding-top: 2rem;
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const TopContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.div`
  margin-left: 260px;
  padding: 1rem;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'Italiana', serif;
  font-size: 3rem;
  text-align: center;
  color: #B1CF86;
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-family: ${fonts.secondary};
  font-size: 1.2rem;
  color: #B1CF86;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  background-color: #D2E6B5;
  color: #0F1914;
  font-family: ${fonts.secondary};
  font-size: 1rem;

  &:focus {
    outline: 2px solid #B1CF86;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.secondary};
  color: #B1CF86;
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #B1CF86;
`;

const NavigationTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  max-width: 800px;
  width: 100%;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-family: ${fonts.secondary};
  font-size: 1.2rem;
  color: #B1CF86;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.active ? '#B1CF86' : 'transparent'};
    transition: background-color 0.2s;
  }

  &:hover:after {
    background-color: #B1CF86;
  }
`;

const SaveButton = styled.button`
  background-color: #B1CF86;
  color: #0F1914;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  font-family: ${fonts.secondary};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: auto;
  display: block;
  margin-top: 2rem;

  &:hover {
    background-color: #C9E4A5;
  }
`;

const FinancialPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { residentId, returnPath } = location.state || {};

  const handleSave = () => {
    // Save all resident information here
    console.log('Saving financial information...', residentId);
    // Navigate back to the info page or resident list
    navigate(returnPath || '/admin/dashboard', {
      state: { residentId }
    });
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Registration</Title>
          
          <NavigationTabs>
            <Tab onClick={() => navigate('/admin/registration/personal')}>Personal</Tab>
            <Tab onClick={() => navigate('/admin/registration/medical')}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/registration/diet')}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/registration/room')}>Room</Tab>
            <Tab onClick={() => navigate('/admin/registration/guardian')}>Guardian</Tab>
            <Tab active>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Payment Preference:</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="paymentPreference" 
                  value="sponsored" 
                />
                Sponsored
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="paymentPreference" 
                  value="subscription" 
                />
                Subscription
              </RadioLabel>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>Sponsor Details:</Label>
            <Input 
              type="text" 
              placeholder="Enter sponsor details (if applicable)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Account Number:</Label>
            <Input 
              type="text" 
              placeholder="Enter account number" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Additional Notes:</Label>
            <Input as="textarea" rows="3" placeholder="Any additional financial notes" />
          </FormGroup>

          <SaveButton onClick={handleSave}>Save</SaveButton>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default FinancialPage;
