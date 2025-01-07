import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';

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

const TextArea = styled.textarea`
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

const ErrorText = styled.p`
  color: red;
`;

const GuardianPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData, updateResidentData } = useResidentRegistration();

  // Initialize form with context data or default values
  const [formData, setFormData] = useState({
    guardian_name: residentData.guardian_name || '',
    guardian_relationship: residentData.guardian_relationship || '',
    guardian_contact: residentData.guardian_contact || '',
    guardian_address: residentData.guardian_address || ''
  });

  // Update form data when context data changes
  useEffect(() => {
    setFormData({
      guardian_name: residentData.guardian_name || '',
      guardian_relationship: residentData.guardian_relationship || '',
      guardian_contact: residentData.guardian_contact || '',
      guardian_address: residentData.guardian_address || ''
    });
  }, [residentData]);

  const [errors, setErrors] = useState({});

  // Handle error state from navigation
  useEffect(() => {
    if (location.state?.errorField) {
      const newErrors = {};
      if (!formData.guardian_name) {
        newErrors.guardian_name = 'Guardian Name is required';
      }
      if (!formData.guardian_relationship) {
        newErrors.guardian_relationship = 'Guardian Relationship is required';
      }
      if (!formData.guardian_contact) {
        newErrors.guardian_contact = 'Guardian Contact is required';
      }
      setErrors(newErrors);
    }
  }, [location.state, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.guardian_name) {
      newErrors.guardian_name = 'Guardian Name is required';
    }
    if (!formData.guardian_relationship) {
      newErrors.guardian_relationship = 'Guardian Relationship is required';
    }
    if (!formData.guardian_contact) {
      newErrors.guardian_contact = 'Guardian Contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Always save data before navigation
  const saveDataBeforeNavigation = () => {
    updateResidentData('guardian', formData);
  };

  const handleNext = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      navigate('/admin/registration/financial', {
        state: { isEditMode, residentId, returnPath }
      });
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      if (returnPath) {
        navigate(returnPath);
      }
    }
  };

  const handleTabChange = (path) => {
    saveDataBeforeNavigation();
    navigate(`/admin/registration/${path}`, {
      state: { isEditMode, residentId, returnPath }
    });
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Registration</Title>
          
          <NavigationTabs>
            <Tab onClick={() => handleTabChange('personal')}>Personal</Tab>
            <Tab onClick={() => handleTabChange('medical')}>Medical</Tab>
            <Tab onClick={() => handleTabChange('diet')}>Diet</Tab>
            <Tab onClick={() => handleTabChange('room')}>Room</Tab>
            <Tab active>Guardian</Tab>
            <Tab onClick={() => handleTabChange('financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Guardian Name:</Label>
            <Input 
              type="text" 
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleInputChange}
              placeholder="Enter guardian's full name" 
            />
            {errors.guardian_name && <ErrorText>{errors.guardian_name}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Guardian Relationship:</Label>
            <Input 
              type="text" 
              name="guardian_relationship"
              value={formData.guardian_relationship}
              onChange={handleInputChange}
              placeholder="Enter relationship (e.g., Son, Daughter, Spouse)" 
            />
            {errors.guardian_relationship && <ErrorText>{errors.guardian_relationship}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Guardian Contact:</Label>
            <Input 
              type="text" 
              name="guardian_contact"
              value={formData.guardian_contact}
              onChange={handleInputChange}
              placeholder="Enter guardian's contact number" 
            />
            {errors.guardian_contact && <ErrorText>{errors.guardian_contact}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Guardian Address:</Label>
            <TextArea 
              name="guardian_address"
              value={formData.guardian_address}
              onChange={handleInputChange}
              placeholder="Enter guardian's full address" 
              rows="2"
            />
          </FormGroup>

          <SaveButton onClick={isEditMode ? handleSave : handleNext}>
            {isEditMode ? 'Save' : 'Next'}
          </SaveButton>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default GuardianPage;
