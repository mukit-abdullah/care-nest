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
  const { residentData: registrationData, updateResidentData: updateRegistrationData } = useResidentRegistration();
  const { residentData, updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});
  
  // Initialize form with empty values
  const [formData, setFormData] = useState({
    dietary_preference: '',
    food_category: '',
    food_texture: '',
    food_allergies: [],  // Initialize as array
    special_diet_needs: '',
    additional_notes: ''
  });

  // Fetch resident data in edit mode
  useEffect(() => {
    if (isEditMode && residentId) {
      console.log('DietPage - Fetching resident:', residentId);
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.get(`http://localhost:5000/api/residents/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log('DietPage - Fetch response:', response.data);
          if (response.data.success && response.data.data.diet) {
            const diet = response.data.data.diet;
            setFormData({
              dietary_preference: diet.dietary_preference || '',
              food_category: diet.food_category || '',
              food_texture: diet.food_texture || '',
              food_allergies: diet.food_allergies || [], // Ensure it's an array
              special_diet_needs: diet.special_diet_needs || '',
              additional_notes: diet.additional_notes || ''
            });
          }
        })
        .catch(error => {
          console.error('DietPage - Fetch error:', error);
          setErrors({ submit: 'Failed to fetch resident data' });
        });
      }
    }
  }, [isEditMode, residentId]);

  // Update form when registration data changes (only in registration mode)
  useEffect(() => {
    if (!isEditMode && registrationData?.diet) {
      setFormData({
        dietary_preference: registrationData.diet.dietary_preference || '',
        food_category: registrationData.diet.food_category || '',
        food_texture: registrationData.diet.food_texture || '',
        food_allergies: registrationData.diet.food_allergies || [], // Ensure it's an array
        special_diet_needs: registrationData.diet.special_diet_needs || '',
        additional_notes: registrationData.diet.additional_notes || ''
      });
    }
  }, [registrationData, isEditMode]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.dietary_preference) {
      newErrors.dietary_preference = 'Dietary Preference is required';
    }
    
    if (!formData.food_category) {
      newErrors.food_category = 'Food Category is required';
    }

    if (!formData.food_texture) {
      newErrors.food_texture = 'Food Texture is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDataBeforeNavigation = () => {
    updateRegistrationData('diet', formData);
  };

  const handleNext = () => {
    if (validateForm()) {
      saveDataBeforeNavigation();
      navigate('/admin/registration/room', { 
        state: { 
          isEditMode, 
          residentId, 
          returnPath 
        } 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isEditMode) {
        try {
          console.log('DietPage - handleSubmit - Starting save:', {
            isEditMode,
            residentId,
            formData
          });

          if (!residentId) {
            console.error('DietPage - handleSubmit - No resident ID available');
            setErrors({ submit: 'No resident ID available for update' });
            return;
          }

          const token = localStorage.getItem('authToken');
          if (!token) {
            setErrors({ submit: 'Authentication token not found' });
            return;
          }

          // First get current data to get diet ID
          console.log('DietPage - handleSubmit - Fetching current data');
          const currentResponse = await axios.get(
            `http://localhost:5000/api/residents/${residentId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('DietPage - handleSubmit - Current data:', currentResponse.data);

          // Get diet record ID
          const dietRecordId = currentResponse.data.data.diet._id;

          // Update the diet record directly
          const updateData = {
            dietary_preference: formData.dietary_preference || '',
            food_category: formData.food_category || '',
            food_texture: formData.food_texture || '',
            food_allergies: Array.isArray(formData.food_allergies) ? formData.food_allergies : [],
            special_diet_needs: formData.special_diet_needs || '',
            additional_notes: formData.additional_notes || ''
          };
          
          console.log('DietPage - handleSubmit - Making API call:', {
            url: `http://localhost:5000/api/diets/${dietRecordId}`,
            data: updateData
          });

          const response = await axios.put(
            `http://localhost:5000/api/diets/${dietRecordId}`,
            updateData,
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }
          );

          console.log('DietPage - handleSubmit - API Response:', response.data);

          if (response.data.success) {
            console.log('DietPage - handleSubmit - Update successful');

            // Get the updated resident data
            const updatedResponse = await axios.get(
              `http://localhost:5000/api/residents/${residentId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (updatedResponse.data.success) {
              // Update the resident context with ALL the data
              const updatedData = updatedResponse.data.data;
              await updateResidentSection('resident', updatedData.resident);
              await updateResidentSection('medicalRecord', updatedData.medicalRecord);
              await updateResidentSection('diet', updatedData.diet);
              await updateResidentSection('room', updatedData.room);
              await updateResidentSection('guardian', updatedData.guardian);
              await updateResidentSection('financialRecord', updatedData.financialRecord);
            }

            navigate(returnPath || '/admin/info/diet', {
              state: { 
                residentId,
                success: true,
                message: 'Diet information updated successfully'
              },
              replace: true
            });
          } else {
            console.error('DietPage - handleSubmit - Update failed:', response.data);
            setErrors({ submit: 'Failed to update diet information' });
          }
        } catch (error) {
          console.error('Error updating diet information:', error);
          if (error.response) {
            console.error('DietPage - handleSubmit - Error response:', {
              status: error.response.status,
              data: error.response.data
            });
            setErrors({ submit: error.response.data.message || 'Failed to update diet information' });
          } else {
            setErrors({ submit: 'An error occurred while updating diet information' });
          }
        }
      } else {
        // Regular registration flow
        saveDataBeforeNavigation();
        navigate('/admin/registration/room', {
          state: {
            isEditMode,
            residentId,
            returnPath
          }
        });
      }
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    if (!isEditMode) {
      updateRegistrationData('diet', formData);
    }
    navigate(path, {
      state: {
        isEditMode,
        residentId,
        returnPath
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for food_allergies
    if (name === 'food_allergies') {
      // Split by commas and trim whitespace
      const allergiesArray = value.split(',').map(item => item.trim());
      setFormData(prev => ({
        ...prev,
        [name]: allergiesArray
      }));
    } else {
      // Regular handling for other fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Update context immediately in registration mode
    if (!isEditMode) {
      updateRegistrationData('diet', {
        ...formData,
        [name]: name === 'food_allergies' ? value.split(',').map(item => item.trim()) : value
      });
    }
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
              value={formData.food_allergies.join(', ')} // Join array with commas
              onChange={handleInputChange}
              placeholder="Enter any food allergies (optional), separate with commas" 
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
