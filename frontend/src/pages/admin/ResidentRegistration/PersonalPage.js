import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';

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
  display: flex;
  flex-direction: column;
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

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  display: block;
`;

const ErrorAlert = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ef9a9a;
`;

const RequiredFieldsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0 0 0;

  li {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    &:before {
      content: "•";
      color: #c62828;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: 0.5em;
    }
  }
`;

const PersonalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData, updateResidentData } = useResidentRegistration();

  const [errors, setErrors] = useState({});

  // Initialize form with context data
  const [formData, setFormData] = useState({
    full_name: residentData.full_name || '',
    gender: residentData.gender || '',
    date_of_birth: residentData.date_of_birth || '',
    contact_number: residentData.contact_number || '',
    emergency_contact_name: residentData.emergency_contact_name || '',
    emergency_contact_number: residentData.emergency_contact_number || '',
    address: residentData.address || '',
    profile_picture: residentData.profile_picture || null
  });

  // Handle error state from navigation and validate all required fields
  useEffect(() => {
    if (location.state?.errorField) {
      const newErrors = {};
      
      // Check all required fields
      if (!formData.full_name) {
        newErrors.full_name = 'Full Name is required';
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
      if (!formData.date_of_birth) {
        newErrors.date_of_birth = 'Date of Birth is required';
      }

      setErrors(newErrors);
    }
  }, [location.state, formData]);

  // Update form data when context data changes
  useEffect(() => {
    setFormData({
      full_name: residentData.full_name || '',
      gender: residentData.gender || '',
      date_of_birth: residentData.date_of_birth || '',
      contact_number: residentData.contact_number || '',
      emergency_contact_name: residentData.emergency_contact_name || '',
      emergency_contact_number: residentData.emergency_contact_number || '',
      address: residentData.address || '',
      profile_picture: residentData.profile_picture || null
    });
  }, [residentData]);

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
    
    if (!formData.full_name) {
      newErrors.full_name = 'Full Name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'Date of Birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDataBeforeNavigation = () => {
    updateResidentData('personal', {
      full_name: formData.full_name,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      contact_number: formData.contact_number,
      emergency_contact_name: formData.emergency_contact_name,
      emergency_contact_number: formData.emergency_contact_number,
      address: formData.address,
      profile_picture: formData.profile_picture
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      navigate('/admin/registration/medical', { 
        state: { 
          isEditMode, 
          residentId, 
          returnPath
        } 
      });
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      navigate(returnPath || '/admin/info/personal', {
        state: { residentId }
      });
    }
  };

  const handleTabChange = (path) => {
    saveDataBeforeNavigation();
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
          <Title>Resident Registration</Title>
          
          {errors.alert && (
            <ErrorAlert>
              <strong>Please complete the following required fields:</strong>
              <RequiredFieldsList>
                {errors.alert.map((error, index) => (
                  <li key={index}>{error.replace('- ', '')}</li>
                ))}
              </RequiredFieldsList>
            </ErrorAlert>
          )}

          <NavigationTabs>
            <Tab active>Personal</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/room')}>Room</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Full Name:</Label>
            {errors.full_name && <ErrorText>{errors.full_name}</ErrorText>}
            <Input 
              type="text" 
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Enter full name" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Gender:</Label>
            {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="gender" 
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                Male
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="gender" 
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                Female
              </RadioLabel>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>Date of Birth:</Label>
            {errors.date_of_birth && <ErrorText>{errors.date_of_birth}</ErrorText>}
            <Input 
              type="date" 
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Contact Number:</Label>
            <Input 
              type="tel" 
              name="contact_number"
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder="Enter contact number (optional)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Emergency Contact Name:</Label>
            <Input 
              type="text" 
              name="emergency_contact_name"
              value={formData.emergency_contact_name}
              onChange={handleInputChange}
              placeholder="Enter emergency contact name (optional)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Emergency Contact Number:</Label>
            <Input 
              type="tel" 
              name="emergency_contact_number"
              value={formData.emergency_contact_number}
              onChange={handleInputChange}
              placeholder="Enter emergency contact number (optional)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Address:</Label>
            <Input 
              as="textarea" 
              rows="3" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address (optional)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Profile Picture:</Label>
            <Input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData(prev => ({
                    ...prev,
                    profile_picture: file
                  }));
                }
              }}
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

export default PersonalPage;
