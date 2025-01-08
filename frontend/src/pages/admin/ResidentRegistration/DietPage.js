import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
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
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const DietPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData, updateResidentData } = useResidentRegistration();
  const { updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});

  // Initialize form with context data
  const [formData, setFormData] = useState({
    dietary_preference: residentData.dietary_preference || '',
    food_category: residentData.food_category || '',
    food_texture: residentData.food_texture || '',
    food_allergies: residentData.food_allergies || '',
    special_diet_needs: residentData.special_diet_needs || '',
    additional_notes: residentData.additional_notes || ''
  });

  // Update form when context data changes
  useEffect(() => {
    setFormData({
      dietary_preference: residentData.dietary_preference || '',
      food_category: residentData.food_category || '',
      food_texture: residentData.food_texture || '',
      food_allergies: residentData.food_allergies || '',
      special_diet_needs: residentData.special_diet_needs || '',
      additional_notes: residentData.additional_notes || ''
    });
  }, [residentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Update context immediately
    updateResidentData('diet', {
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      updateResidentSection('diet', formData);
      navigate(returnPath || '/admin/residents');
    } else {
      // Regular registration flow
      updateResidentData('diet', formData);
      navigate('/admin/registration/medical');
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    updateResidentData('diet', formData);
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
          <Title>{isEditMode ? 'Update Diet Information' : 'Resident Registration'}</Title>
          
          {!isEditMode && (
            <NavigationTabs>
              <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
              <Tab active>Diet</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/room')}>Room</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
            </NavigationTabs>
          )}
        </TopContent>
      </TopSection>
      
      <MainContent>
        {errors.submit && (
          <ErrorText>{errors.submit}</ErrorText>
        )}

        <FormContainer>
          <FormGroup>
            <Label>Dietary Preferences:</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="dietary_preference" 
                  value="Vegetarian"
                  checked={formData.dietary_preference === 'Vegetarian'}
                  onChange={handleInputChange}
                />
                Vegetarian
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="dietary_preference" 
                  value="Non-Vegetarian"
                  checked={formData.dietary_preference === 'Non-Vegetarian'}
                  onChange={handleInputChange}
                />
                Non-Vegetarian
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="dietary_preference" 
                  value="Vegan"
                  checked={formData.dietary_preference === 'Vegan'}
                  onChange={handleInputChange}
                />
                Vegan
              </RadioLabel>
            </RadioGroup>
            {errors.dietary_preference && <ErrorText>{errors.dietary_preference}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Food Category:</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="food_category" 
                  value="Spicy"
                  checked={formData.food_category === 'Spicy'}
                  onChange={handleInputChange}
                />
                Spicy
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="food_category" 
                  value="Non-Spicy"
                  checked={formData.food_category === 'Non-Spicy'}
                  onChange={handleInputChange}
                />
                Non-Spicy
              </RadioLabel>
            </RadioGroup>
            {errors.food_category && <ErrorText>{errors.food_category}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Food Texture:</Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="food_texture" 
                  value="Hard"
                  checked={formData.food_texture === 'Hard'}
                  onChange={handleInputChange}
                />
                Hard
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="food_texture" 
                  value="Soft"
                  checked={formData.food_texture === 'Soft'}
                  onChange={handleInputChange}
                />
                Soft
              </RadioLabel>
            </RadioGroup>
            {errors.food_texture && <ErrorText>{errors.food_texture}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Food Allergies:</Label>
            <TextArea 
              name="food_allergies"
              value={formData.food_allergies}
              onChange={handleInputChange}
              placeholder="Enter any food allergies (optional)" 
              rows="2"
            />
          </FormGroup>

          <FormGroup>
            <Label>Special Diet Needs:</Label>
            <TextArea 
              name="special_diet_needs"
              value={formData.special_diet_needs}
              onChange={handleInputChange}
              placeholder="Enter any special diet needs (optional)" 
              rows="2"
            />
          </FormGroup>

          <FormGroup>
            <Label>Additional Notes:</Label>
            <TextArea 
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleInputChange}
              placeholder="Enter any additional notes about dietary requirements (optional)" 
              rows="2"
            />
          </FormGroup>

          <SaveButton onClick={handleSubmit}>
            {isEditMode ? 'Save' : 'Next'}
          </SaveButton>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default DietPage;
