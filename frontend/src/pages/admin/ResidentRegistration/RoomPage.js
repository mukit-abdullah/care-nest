import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
import { useResident } from '../../../context/ResidentContext';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
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
  border: none;
  background-color: #B1CF86;
  color: #0F1914;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  font-family: ${fonts.secondary};
  cursor: pointer;
  font-size: 1rem;
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

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #ef9a9a;
`;

const RoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData: registrationData, updateResidentData: updateRegistrationData } = useResidentRegistration();
  const { residentData, updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});

  // Initialize form with context data
  const [formData, setFormData] = useState({
    room_type: registrationData?.room_type || '',
    room_number: registrationData?.room_number || '',
    special_facilities: registrationData?.special_facilities || '',
    additional_notes: registrationData?.additional_notes || ''
  });

  // Update form when context data changes
  useEffect(() => {
    if (!isEditMode && registrationData) {
      setFormData({
        room_type: registrationData.room_type || '',
        room_number: registrationData.room_number || '',
        special_facilities: registrationData.special_facilities || '',
        additional_notes: registrationData.additional_notes || ''
      });
    }
  }, [registrationData, isEditMode]);

  // Load resident data in edit mode
  useEffect(() => {
    if (isEditMode && residentId) {
      console.log('RoomPage - Fetching resident:', residentId);
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.get(`http://localhost:5000/api/residents/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log('RoomPage - Fetch response:', response.data);
          if (response.data.success && response.data.data.room) {
            const room = response.data.data.room;
            setFormData({
              room_type: room.room_type || '',
              room_number: room.room_number || '',
              special_facilities: room.special_facilities || '',
              additional_notes: room.additional_notes || ''
            });
          }
        })
        .catch(error => {
          console.error('RoomPage - Fetch error:', error);
          setErrors({ submit: 'Failed to fetch resident data' });
        });
      }
    }
  }, [isEditMode, residentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for special_facilities
    if (name === 'special_facilities') {
      // Split by commas and trim whitespace
      const facilitiesArray = value.split(',').map(item => item.trim()).filter(item => item);
      setFormData(prev => ({
        ...prev,
        [name]: facilitiesArray
      }));
    } else {
      // For room_number, keep it as string
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Update context immediately
    if (!isEditMode) {
      updateRegistrationData('room', {
        ...formData,
        [name]: name === 'special_facilities' ? 
          value.split(',').map(item => item.trim()).filter(item => item) : 
          value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.room_type) {
      newErrors.room_type = 'Room type is required';
    }
    
    if (!formData.room_number) {
      newErrors.room_number = 'Room number is required';
    } else if (isNaN(formData.room_number) || formData.room_number < 1) {
      newErrors.room_number = 'Room number must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isEditMode) {
        try {
          console.log('RoomPage - handleSubmit - Starting save:', {
            isEditMode,
            residentId,
            formData
          });

          if (!residentId) {
            console.error('RoomPage - handleSubmit - No resident ID available');
            setErrors({ submit: 'No resident ID available for update' });
            return;
          }

          const token = localStorage.getItem('authToken');
          if (!token) {
            setErrors({ submit: 'Authentication token not found' });
            return;
          }

          // First get current data to get room number
          console.log('RoomPage - handleSubmit - Fetching current data');
          const currentResponse = await axios.get(
            `http://localhost:5000/api/residents/${residentId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log('RoomPage - handleSubmit - Current data:', currentResponse.data);

          // Get current room number - this is what we use to find the room
          const currentRoomNumber = currentResponse.data.data.room.room_number;

          // Update the room record directly
          const updateData = {
            room_type: formData.room_type || '',
            room_number: String(formData.room_number || ''), // Ensure room_number is string
            special_facilities: Array.isArray(formData.special_facilities) ? formData.special_facilities : [],
            additional_notes: formData.additional_notes || ''
          };
          
          console.log('RoomPage - handleSubmit - Making API call:', {
            url: `http://localhost:5000/api/rooms/${currentRoomNumber}`,
            data: updateData
          });

          const response = await axios.put(
            `http://localhost:5000/api/rooms/${currentRoomNumber}`,
            updateData,
            { 
              headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              } 
            }
          );

          console.log('RoomPage - handleSubmit - API Response:', response.data);

          if (response.data.success) {
            console.log('RoomPage - handleSubmit - Update successful');

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

            navigate(returnPath || '/admin/info/room', {
              state: { 
                residentId,
                success: true,
                message: 'Room information updated successfully'
              },
              replace: true
            });
          } else {
            console.error('RoomPage - handleSubmit - Update failed:', response.data);
            setErrors({ submit: 'Failed to update room information' });
          }
        } catch (error) {
          console.error('Error updating room information:', error);
          if (error.response) {
            console.error('RoomPage - handleSubmit - Error response:', {
              status: error.response.status,
              data: error.response.data
            });
            setErrors({ submit: error.response.data.message || 'Failed to update room information' });
          } else {
            setErrors({ submit: 'An error occurred while updating room information' });
          }
        }
      } else {
        // Regular registration flow
        updateRegistrationData('room', formData);
        navigate('/admin/registration/guardian', {
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
      updateRegistrationData('room', formData);
    }
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
          <Title>{isEditMode ? 'Update Room Information' : 'Resident Registration'}</Title>
          
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

          {!isEditMode && (
            <NavigationTabs>
              <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
              <Tab active>Room</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
            </NavigationTabs>
          )}
        </TopContent>
      </TopSection>
      
      <MainContent>
        {errors.submit && (
          <ErrorMessage>{errors.submit}</ErrorMessage>
        )}

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
            <Label>Room Number *</Label>
            <Input
              type="number"
              name="room_number"
              value={formData.room_number}
              onChange={handleInputChange}
              placeholder="Enter room number"
              min="1"
            />
            {errors.room_number && <ErrorText>{errors.room_number}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Special Facilities:</Label>
            <TextArea 
              name="special_facilities"
              value={Array.isArray(formData.special_facilities) ? formData.special_facilities.join(', ') : formData.special_facilities}
              onChange={handleInputChange}
              placeholder="Enter any special facilities (optional), separate with commas" 
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

export default RoomPage;
