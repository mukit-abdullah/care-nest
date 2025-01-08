import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
import axios from 'axios';

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

const MedicalPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData, updateResidentData } = useResidentRegistration();

  // Initialize form with context data
  const [formData, setFormData] = useState({
    blood_group: residentData.blood_group || '',
    medical_history: residentData.medical_history || '',
    medical_files_url: residentData.medical_files_url || [],
    current_medication: residentData.current_medication || '',
    physician_name: residentData.physician_name || '',
    physician_contact_number: residentData.physician_contact_number || '',
    special_needs: residentData.special_needs || '',
    insurance_details: residentData.insurance_details || '',
    insurance_files_url: residentData.insurance_files_url || []
  });

  // Update form data when context data changes
  useEffect(() => {
    setFormData({
      blood_group: residentData.blood_group || '',
      medical_history: residentData.medical_history || '',
      medical_files_url: residentData.medical_files_url || [],
      current_medication: residentData.current_medication || '',
      physician_name: residentData.physician_name || '',
      physician_contact_number: residentData.physician_contact_number || '',
      special_needs: residentData.special_needs || '',
      insurance_details: residentData.insurance_details || '',
      insurance_files_url: residentData.insurance_files_url || []
    });
  }, [residentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value
    };
    setFormData(updatedData);
    
    // Format data for backend
    const medicalData = {
      blood_group: updatedData.blood_group,
      medical_history: updatedData.medical_history,
      medical_files_url: updatedData.medical_files_url,
      current_medication: updatedData.current_medication,
      physician_name: updatedData.physician_name,
      physician_contact_number: updatedData.physician_contact_number,
      special_needs: updatedData.special_needs,
      insurance_details: updatedData.insurance_details,
      insurance_files_url: updatedData.insurance_files_url
    };
    
    // Update context
    updateResidentData('medical', medicalData);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedData = {
      ...formData,
      [e.target.name]: [...(formData[e.target.name] || []), ...files]
    };
    setFormData(updatedData);
    
    // Format data for backend
    const medicalData = {
      blood_group: updatedData.blood_group,
      medical_history: updatedData.medical_history,
      medical_files_url: updatedData.medical_files_url,
      current_medication: updatedData.current_medication,
      physician_name: updatedData.physician_name,
      physician_contact_number: updatedData.physician_contact_number,
      special_needs: updatedData.special_needs,
      insurance_details: updatedData.insurance_details,
      insurance_files_url: updatedData.insurance_files_url
    };
    
    // Update context
    updateResidentData('medical', medicalData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditMode && returnPath) {
      navigate(returnPath, { state: { residentId } });
    } else {
      navigate('/admin/registration/diet', { 
        state: { 
          isEditMode,
          residentId,
          returnPath
        } 
      });
    }
  };

  // Handle navigation tab changes
  const handleTabChange = (path) => {
    // Save current data before navigation
    updateResidentData('medical', formData);
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
          <Title>{isEditMode ? 'Edit Medical Information' : 'Medical Registration'}</Title>
          
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
            <FormGroup>
              <Label>Blood Group *</Label>
              <Input 
                type="text"
                name="blood_group"
                value={formData.blood_group}
                onChange={handleInputChange}
                placeholder="Enter Blood Group" 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Medical History *</Label>
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
