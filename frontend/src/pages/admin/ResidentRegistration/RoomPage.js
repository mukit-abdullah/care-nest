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

const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData, updateResidentData } = useResidentRegistration();

  const [errors, setErrors] = useState({});

  // Initialize form with context data
  const [formData, setFormData] = useState({
    room_type: residentData.room_type || '',
    room_number: residentData.room_number || '',
    special_facilities: residentData.special_facilities || []
  });

  // Update form data when context data changes
  useEffect(() => {
    setFormData({
      room_type: residentData.room_type || '',
      room_number: residentData.room_number || '',
      special_facilities: residentData.special_facilities || []
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

  // Handle error state from navigation and validate all required fields
  useEffect(() => {
    if (location.state?.errorField) {
      const newErrors = {};
      
      // Check all required fields
      if (!formData.room_type) {
        newErrors.room_type = 'Room Type is required';
      }
      if (!formData.room_number) {
        newErrors.room_number = 'Room Number is required';
      }

      setErrors(newErrors);
    }
  }, [location.state, formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.room_type) {
      newErrors.room_type = 'Room type is required';
    }
    
    if (!formData.room_number) {
      newErrors.room_number = 'Room number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDataBeforeNavigation = () => {
    updateResidentData('room', {
      room_type: formData.room_type,
      room_number: formData.room_number,
      special_facilities: formData.special_facilities
    });
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

  const handleNext = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      navigate('/admin/registration/guardian', { 
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
      navigate(returnPath || '/admin/info/room', {
        state: { residentId }
      });
    }
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
            <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
            <Tab active>Room</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Room Type:</Label>
            {errors.room_type && <ErrorText>{errors.room_type}</ErrorText>}
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="room_type" 
                  value="single"
                  checked={formData.room_type === 'single'}
                  onChange={handleInputChange}
                />
                Single
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="room_type" 
                  value="shared"
                  checked={formData.room_type === 'shared'}
                  onChange={handleInputChange}
                />
                Shared
              </RadioLabel>
            </RadioGroup>
          </FormGroup>

          <FormGroup>
            <Label>Room Number:</Label>
            {errors.room_number && <ErrorText>{errors.room_number}</ErrorText>}
            <Input 
              type="text" 
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              placeholder="Enter room number" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Special Facilities:</Label>
            <TextArea 
              name="special_facilities"
              value={formData.special_facilities}
              onChange={handleInputChange}
              placeholder="Enter special facilities (optional)" 
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

export default RoomPage;
