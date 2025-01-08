import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
import { useResident } from '../../../context/ResidentContext';
import axios from 'axios';
import { getAdminToken } from '../../../services/authService';

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
  const { updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});
  
  // Initialize form with context data
  const [formData, setFormData] = useState({
    guardian_name: residentData.guardian_name || '',
    guardian_relationship: residentData.guardian_relationship || '',
    guardian_contact_number: residentData.guardian_contact_number || '',
    guardian_address: residentData.guardian_address || ''
  });

  // Update form when context data changes
  useEffect(() => {
    setFormData({
      guardian_name: residentData.guardian_name || '',
      guardian_relationship: residentData.guardian_relationship || '',
      guardian_contact_number: residentData.guardian_contact_number || '',
      guardian_address: residentData.guardian_address || ''
    });
  }, [residentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Update context immediately
    updateResidentData('guardian', {
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.guardian_name) {
      newErrors.guardian_name = 'Guardian name is required';
    }
    
    if (!formData.guardian_relationship) {
      newErrors.guardian_relationship = 'Guardian relationship is required';
    }

    if (!formData.guardian_contact_number) {
      newErrors.guardian_contact_number = 'Guardian contact number is required';
    }

    if (!formData.guardian_address) {
      newErrors.guardian_address = 'Guardian address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditMode) {
      updateResidentSection('guardian', formData);
      navigate(returnPath || '/admin/residents');
    } else {
      // Regular registration flow
      updateResidentData('guardian', formData);
      navigate('/admin/registration/financial');
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    updateResidentData('guardian', formData);
    navigate(path, {
      state: {
        isEditMode,
        residentId,
        returnPath
      }
    });
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>{isEditMode ? 'Update Info' : 'Resident Registration'}</Title>
          
          {!isEditMode && (
            <NavigationTabs>
              <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/room')}>Room</Tab>
              <Tab active>Guardian</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
            </NavigationTabs>
          )}
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Guardian Name</Label>
              <Input
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleInputChange}
                placeholder="Enter guardian's name"
              />
              {errors.guardian_name && <ErrorText>{errors.guardian_name}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Relationship to Resident</Label>
              <Input
                type="text"
                name="guardian_relationship"
                value={formData.guardian_relationship}
                onChange={handleInputChange}
                placeholder="Enter relationship to resident"
              />
              {errors.guardian_relationship && <ErrorText>{errors.guardian_relationship}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Guardian Contact Number</Label>
              <Input
                type="text"
                name="guardian_contact_number"
                value={formData.guardian_contact_number}
                onChange={handleInputChange}
                placeholder="Enter guardian's contact number"
              />
              {errors.guardian_contact_number && <ErrorText>{errors.guardian_contact_number}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Guardian Address</Label>
              <TextArea
                name="guardian_address"
                value={formData.guardian_address}
                onChange={handleInputChange}
                placeholder="Enter guardian's address"
                rows={4}
              />
              {errors.guardian_address && <ErrorText>{errors.guardian_address}</ErrorText>}
            </FormGroup>

            <SaveButton type="submit">
              {isEditMode ? 'Save Changes' : 'Next'}
            </SaveButton>
          </form>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default GuardianPage;
