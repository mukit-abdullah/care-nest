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
  const { residentData: registrationData, updateResidentData: updateRegistrationData } = useResidentRegistration();
  const { residentData, updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});
  
  // Initialize form with context data
  const [formData, setFormData] = useState({
    name: registrationData?.guardian_name || '',
    relationship: registrationData?.guardian_relationship || '',
    guardian_contact_number: registrationData?.guardian_contact_number || '',
    guardian_address: registrationData?.guardian_address || ''
  });

  // Update form when context data changes
  useEffect(() => {
    if (!isEditMode && registrationData) {
      setFormData({
        name: registrationData.guardian_name || '',
        relationship: registrationData.guardian_relationship || '',
        guardian_contact_number: registrationData.guardian_contact_number || '',
        guardian_address: registrationData.guardian_address || ''
      });
    }
  }, [registrationData, isEditMode]);

  // Load resident data in edit mode
  useEffect(() => {
    if (isEditMode && residentData?.guardian) {
      setFormData({
        name: residentData.guardian.name || '',
        relationship: residentData.guardian.relationship || '',
        guardian_contact_number: residentData.guardian.guardian_contact_number || '',
        guardian_address: residentData.guardian.guardian_address || ''
      });
    }
  }, [isEditMode, residentData]);

  const validateForm = () => {
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update local form state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update context immediately
    if (!isEditMode) {
      updateRegistrationData('guardian', {
        guardian_name: name === 'name' ? value : formData.name,
        guardian_relationship: name === 'relationship' ? value : formData.relationship,
        guardian_contact_number: name === 'guardian_contact_number' ? value : formData.guardian_contact_number,
        guardian_address: name === 'guardian_address' ? value : formData.guardian_address
      });
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    if (!isEditMode) {
      updateRegistrationData('guardian', {
        guardian_name: formData.name,
        guardian_relationship: formData.relationship,
        guardian_contact_number: formData.guardian_contact_number,
        guardian_address: formData.guardian_address
      });
    }
    navigate(path, {
      state: {
        isEditMode,
        residentId,
        returnPath
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      try {
        if (!residentId) {
          setErrors({ submit: 'No resident ID available for update' });
          return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
          setErrors({ submit: 'Authentication token not found' });
          return;
        }

        // First get current data to get guardian ID
        const currentResponse = await axios.get(
          `http://localhost:5000/api/residents/${residentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Get guardian ID
        const guardianId = currentResponse.data.data.guardian._id;

        // Update the guardian record directly
        const updateData = {
          name: formData.name || '',
          relationship: formData.relationship || '',
          guardian_contact_number: formData.guardian_contact_number || '',
          guardian_address: formData.guardian_address || '',
          resident_id: residentId
        };

        const response = await axios.put(
          `http://localhost:5000/api/guardians/${guardianId}`,
          updateData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data.success) {
          // Get the updated resident data
          const updatedResponse = await axios.get(
            `http://localhost:5000/api/residents/${residentId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (updatedResponse.data.success) {
            // Update the resident context with the new data
            const updatedData = updatedResponse.data.data;
            await updateResidentSection('resident', updatedData.resident);
            await updateResidentSection('medicalRecord', updatedData.medicalRecord);
            await updateResidentSection('diet', updatedData.diet);
            await updateResidentSection('room', updatedData.room);
            await updateResidentSection('guardian', updatedData.guardian);
            await updateResidentSection('financialRecord', updatedData.financialRecord);
          }

          navigate(returnPath || '/admin/info/guardian', {
            state: { 
              residentId,
              success: true,
              message: 'Guardian information updated successfully'
            },
            replace: true
          });
        } else {
          setErrors({ submit: 'Failed to update guardian information' });
        }
      } catch (error) {
        console.error('Error updating guardian information:', error);
        setErrors({ 
          submit: error.response?.data?.message || 'Failed to update guardian information'
        });
      }
    } else {
      // Regular registration flow - no validation needed
      updateRegistrationData('guardian', {
        guardian_name: formData.name,
        guardian_relationship: formData.relationship,
        guardian_contact_number: formData.guardian_contact_number,
        guardian_address: formData.guardian_address
      });
      navigate('/admin/registration/financial', {
        state: {
          isEditMode,
          residentId,
          returnPath
        }
      });
    }
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>{isEditMode ? 'Update Guardian Info' : 'Resident Registration'}</Title>
          
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
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter guardian's name"
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label>Relationship to Resident</Label>
              <Input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                placeholder="Enter relationship to resident"
              />
              {errors.relationship && <ErrorText>{errors.relationship}</ErrorText>}
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

            {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

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
