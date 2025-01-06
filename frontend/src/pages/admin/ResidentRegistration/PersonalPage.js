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

const GenderGroup = styled.div`
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

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #B1CF86;
  color: #0F1914;
  border-radius: 5px;
  cursor: pointer;
  font-family: ${fonts.secondary};
  transition: background-color 0.2s;

  &:hover {
    background-color: #C9E4A5;
  }

  input {
    display: none;
  }
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

const PersonalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};

  const handleNext = () => {
    navigate('/admin/registration/medical', { 
      state: { 
        isEditMode,
        residentId,
        returnPath: returnPath
      } 
    });
  };

  const handleSave = () => {
    // Save logic here
    console.log('Saving personal information...', residentId);
    // Navigate back to the info page
    navigate(returnPath || '/admin/info/personal', {
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
            <Tab active>Personal</Tab>
            <Tab onClick={() => navigate('/admin/registration/medical')}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/registration/diet')}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/registration/room')}>Room</Tab>
            <Tab onClick={() => navigate('/admin/registration/guardian')}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/registration/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Full Name:</Label>
            <Input type="text" placeholder="Enter resident's full name" />
          </FormGroup>

          <FormGroup>
            <Label>Gender:</Label>
            <GenderGroup>
              <RadioLabel>
                <RadioInput type="radio" name="gender" value="male" />
                Male
              </RadioLabel>
              <RadioLabel>
                <RadioInput type="radio" name="gender" value="female" />
                Female
              </RadioLabel>
            </GenderGroup>
          </FormGroup>

          <FormGroup>
            <Label>Date of Birth:</Label>
            <Input type="date" />
          </FormGroup>

          <FormGroup>
            <Label>Contact Number:</Label>
            <Input type="tel" placeholder="Enter contact number" />
          </FormGroup>

          <FormGroup>
            <Label>Emergency Contact Name:</Label>
            <Input type="text" placeholder="Enter emergency contact name" />
          </FormGroup>

          <FormGroup>
            <Label>Emergency Contact Number:</Label>
            <Input type="tel" placeholder="Enter emergency contact number" />
          </FormGroup>

          <FormGroup>
            <Label>Address:</Label>
            <Input as="textarea" rows="3" placeholder="Enter full address" />
          </FormGroup>

          <FormGroup>
            <Label>Profile Picture:</Label>
            <UploadButton>
              <input type="file" accept="image/*" />
              Upload a file
            </UploadButton>
          </FormGroup>

          <SaveButton onClick={isEditMode ? handleSave : handleNext}>
            {isEditMode ? 'Save' : 'Next'}
          </SaveButton>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default PersonalPage;
