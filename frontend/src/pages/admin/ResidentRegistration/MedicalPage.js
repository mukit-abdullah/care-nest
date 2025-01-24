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
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: 2px solid #B1CF86;
  }
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

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const MedicalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData: registrationData, updateResidentData: updateRegistrationData, resetRegistrationData } = useResidentRegistration();
  const { residentData, updateResidentSection } = useResident();
  const [errors, setErrors] = useState({});
  
  // Initialize form with context data
  const [formData, setFormData] = useState({
    blood_group: registrationData?.blood_group || '',
    medical_history: registrationData?.medical_history || '',
    medical_files_url: registrationData?.medical_files_url || [],
    current_medication: registrationData?.current_medication || '',
    physician_name: registrationData?.physician_name || '',
    physician_contact_number: registrationData?.physician_contact_number || '',
    special_needs: registrationData?.special_needs || '',
    insurance_details: registrationData?.insurance_details || '',
    insurance_files_url: registrationData?.insurance_files_url || []
  });

  // Update form when context data changes
  useEffect(() => {
    if (!isEditMode && registrationData) {
      setFormData({
        blood_group: registrationData.blood_group || '',
        medical_history: registrationData.medical_history || '',
        medical_files_url: registrationData.medical_files_url || [],
        current_medication: registrationData.current_medication || '',
        physician_name: registrationData.physician_name || '',
        physician_contact_number: registrationData.physician_contact_number || '',
        special_needs: registrationData.special_needs || '',
        insurance_details: registrationData.insurance_details || '',
        insurance_files_url: registrationData.insurance_files_url || []
      });
    }
  }, [registrationData, isEditMode]);

  // Fetch resident data in edit mode
  useEffect(() => {
    if (isEditMode && residentId) {
      console.log('MedicalPage - Fetching resident:', residentId);
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.get(`http://localhost:5000/api/residents/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log('MedicalPage - Fetch response:', response.data);
          if (response.data.success && response.data.data.medicalRecord) {
            const medical = response.data.data.medicalRecord;
            setFormData({
              blood_group: medical.blood_group || '',
              medical_history: medical.medical_history || '',
              medical_files_url: medical.medical_files_url || [],
              current_medication: medical.current_medication || '',
              physician_name: medical.physician_name || '',
              physician_contact_number: medical.physician_contact_number || '',
              special_needs: medical.special_needs || '',
              insurance_details: medical.insurance_details || '',
              insurance_files_url: medical.insurance_files_url || []
            });
          }
        })
        .catch(error => {
          console.error('MedicalPage - Fetch error:', error);
          setErrors({ submit: 'Failed to fetch resident data' });
        });
      }
    }
  }, [isEditMode, residentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update local form state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update context immediately
    if (!isEditMode) {
      updateRegistrationData('medical', {
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const updatedFiles = Array.from(files);
    
    // Update local form state
    setFormData(prev => ({
      ...prev,
      [name]: updatedFiles
    }));

    // Update context immediately
    if (!isEditMode) {
      updateRegistrationData('medical', {
        ...formData,
        [name]: updatedFiles
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditMode) {
      try {
        // Get the correct resident ID
        const currentId = residentId;
        
        console.log('MedicalPage - handleSubmit - Starting save:', {
          isEditMode,
          residentId: currentId,
          formData
        });

        if (!currentId) {
          console.error('MedicalPage - handleSubmit - No resident ID available');
          setErrors({ submit: 'No resident ID available for update' });
          return;
        }

        const token = localStorage.getItem('authToken');
        if (!token) {
          setErrors({ submit: 'Authentication token not found' });
          return;
        }

        // First, get current data to see structure
        console.log('MedicalPage - handleSubmit - Fetching current data');
        const currentResponse = await axios.get(
          `http://localhost:5000/api/residents/${currentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('MedicalPage - handleSubmit - Current data:', currentResponse.data);

        // Get medical record ID
        const medicalRecordId = currentResponse.data.data.medicalRecord._id;

        // Update the medical record directly
        const updateData = {
          blood_group: formData.blood_group || '',
          medical_history: formData.medical_history || '',
          medical_files_url: formData.medical_files_url || [],
          current_medication: formData.current_medication || '',
          physician_name: formData.physician_name || '',
          physician_contact_number: formData.physician_contact_number || '',
          special_needs: formData.special_needs || '',
          insurance_details: formData.insurance_details || '',
          insurance_files_url: formData.insurance_files_url || []
        };
        
        console.log('MedicalPage - handleSubmit - Making API call:', {
          url: `http://localhost:5000/api/medical-records/${medicalRecordId}`,
          data: updateData
        });

        const response = await axios.put(
          `http://localhost:5000/api/medical-records/${medicalRecordId}`,
          updateData,
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            } 
          }
        );

        console.log('MedicalPage - handleSubmit - API Response:', response.data);

        if (response.data.success) {
          console.log('MedicalPage - handleSubmit - Update successful');

          // Get the updated resident data
          const updatedResponse = await axios.get(
            `http://localhost:5000/api/residents/${currentId}`,
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
          
          // Navigate back with replace to prevent history stack issues
          navigate(returnPath || '/admin/info/medical', {
            state: { residentId: currentId },
            replace: true
          });
        } else {
          console.error('MedicalPage - handleSubmit - Update failed:', response.data);
          setErrors({ submit: 'Failed to update resident information' });
        }
      } catch (error) {
        console.error('MedicalPage - handleSubmit - Error:', error);
        if (error.response) {
          console.error('MedicalPage - handleSubmit - Error response:', {
            status: error.response.status,
            data: error.response.data
          });
          setErrors({ submit: error.response.data.message || 'Failed to update resident information' });
        } else {
          setErrors({ submit: 'An error occurred while updating resident information' });
        }
      }
    } else {
      // Save data before navigation
      updateRegistrationData('medical', formData);
      navigate('/admin/registration/diet');
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    if (!isEditMode) {
      updateRegistrationData('medical', formData);
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
          <Title>{isEditMode ? 'Update Info' : 'Resident Registration'}</Title>
          
          {!isEditMode && (
            <NavigationTabs>
              <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
              <Tab active>Medical</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/room')}>Room</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
              <Tab onClick={() => handleTabChange('/admin/registration/financial')}>Financial</Tab>
            </NavigationTabs>
          )}
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
            <FormGroup>
              <Label>Blood Group</Label>
              <Input 
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleInputChange}
                placeholder="Enter Blood Group" 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Medical History</Label>
              <TextArea 
                name="medical_history"
                value={formData.medical_history}
                onChange={handleInputChange}
                placeholder="Enter medical history" 
                rows={4}
              />
            </FormGroup>

            <FormGroup>
              <Label>Medical Files</Label>
              <UploadButton>
                Upload Files
                <input 
                  type="file" 
                  name="medical_files_url"
                  onChange={handleFileChange}
                  multiple
                />
              </UploadButton>
              {formData.medical_files_url.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  {formData.medical_files_url.map((file, index) => (
                    <div key={index} style={{ color: '#B1CF86' }}>
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Current Medication</Label>
              <TextArea 
                name="current_medication"
                value={formData.current_medication}
                onChange={handleInputChange}
                placeholder="Enter current medications" 
                rows={4}
              />
            </FormGroup>

            <FormGroup>
              <Label>Primary Physician Name</Label>
              <Input 
                type="text" 
                name="physician_name"
                value={formData.physician_name}
                onChange={handleInputChange}
                placeholder="Enter physician's name" 
              />
            </FormGroup>

            <FormGroup>
              <Label>Primary Physician Contact</Label>
              <Input
                type="text"
                name="physician_contact_number"
                value={formData.physician_contact_number}
                onChange={handleInputChange}
                placeholder="Enter physician's contact number"
              />
            </FormGroup>

            <FormGroup>
              <Label>Special Needs</Label>
              <TextArea 
                name="special_needs"
                value={formData.special_needs}
                onChange={handleInputChange}
                placeholder="Enter any special needs or requirements" 
                rows={4}
              />
            </FormGroup>

            <FormGroup>
              <Label>Insurance Details</Label>
              <Input
                type="text"
                name="insurance_details"
                value={formData.insurance_details}
                onChange={handleInputChange}
                placeholder="Enter insurance details"
              />
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

export default MedicalPage;
