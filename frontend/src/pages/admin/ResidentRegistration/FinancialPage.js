import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
import { useResident } from '../../../context/ResidentContext';
import axios from 'axios';
import { getAdminToken, isAdminActive, clearAuthData, urls } from '../../../services/authService';

// Configure axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAdminToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added auth token to request:', config.headers.Authorization);
    } else {
      console.warn('No auth token available for request');
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized request:', error.response.data);
      clearAuthData();
    }
    return Promise.reject(error);
  }
);

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

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  display: block;
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

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: block;
`;

const FinancialPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isEditMode, residentId, returnPath } = location.state || {};
  const { residentData: registrationData, updateResidentData: updateRegistrationData } = useResidentRegistration();
  const { residentData, updateResidentSection } = useResident();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize form with context data
  const [formData, setFormData] = useState({
    payment_preference: registrationData?.payment_preference || '',
    account_number: registrationData?.account_number || '',
    payment_details: registrationData?.payment_details || ''
  });

  // Update form when context data changes
  useEffect(() => {
    if (!isEditMode && registrationData) {
      setFormData({
        payment_preference: registrationData.payment_preference || '',
        account_number: registrationData.account_number || '',
        payment_details: registrationData.payment_details || ''
      });
    }
  }, [registrationData, isEditMode]);

  // Load resident data in edit mode
  useEffect(() => {
    if (isEditMode && residentData?.financialRecord) {
      setFormData({
        payment_preference: residentData.financialRecord.payment_preference || '',
        account_number: residentData.financialRecord.account_number || '',
        payment_details: residentData.financialRecord.payment_details || ''
      });
    }
  }, [isEditMode, residentData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update local form state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update context immediately
    if (!isEditMode) {
      updateRegistrationData('financial', {
        ...formData,  // Spread existing form data
        [name]: value
      });
    }
  };

  const handleTabChange = (path) => {
    // Save current data before navigation
    if (!isEditMode) {
      updateRegistrationData('financial', formData);
    }
    navigate(path, {
      state: {
        isEditMode,
        residentId,
        returnPath
      }
    });
  };

  // Handle error state from navigation
  useEffect(() => {
    if (location.state?.errorField) {
      const newErrors = {};
      if (location.state.errorField === 'payment_preference') {
        newErrors.payment_preference = location.state.errorMessage || 'Payment Preference is required';
      }
      setErrors(newErrors);
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.payment_preference) {
      newErrors.payment_preference = 'Payment Preference is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Always save data before navigation
  const saveDataBeforeNavigation = () => {
    updateRegistrationData('financial', formData);
  };

  const validateAllFields = () => {
    const validationErrors = [];

    // Check Personal page required fields
    if (!registrationData.full_name || !registrationData.gender || !registrationData.date_of_birth) {
      if (!registrationData.full_name) {
        validationErrors.push({ page: 'personal', message: 'Full Name is required', field: 'full_name' });
      }
      if (!registrationData.gender) {
        validationErrors.push({ page: 'personal', message: 'Gender is required', field: 'gender' });
      }
      if (!registrationData.date_of_birth) {
        validationErrors.push({ page: 'personal', message: 'Date of Birth is required', field: 'date_of_birth' });
      }
    }

    // Check Diet page required fields
    if (!registrationData.dietary_preference) {
      validationErrors.push({ page: 'diet', message: 'Dietary Preference is required', field: 'dietary_preference' });
    }
    if (!registrationData.food_category) {
      validationErrors.push({ page: 'diet', message: 'Food Category is required', field: 'food_category' });
    }
    if (!registrationData.food_texture) {
      validationErrors.push({ page: 'diet', message: 'Food Texture is required', field: 'food_texture' });
    }

    // Check Room page required fields
    if (!registrationData.room_type) {
      validationErrors.push({ page: 'room', message: 'Room Type is required', field: 'room_type' });
    }
    if (!registrationData.room_number) {
      validationErrors.push({ page: 'room', message: 'Room Number is required', field: 'room_number' });
    }

    // Check current page required fields
    if (!formData.payment_preference) {
      validationErrors.push({ page: 'financial', message: 'Payment Preference is required', field: 'payment_preference' });
    }

    return validationErrors;
  };

  const handleSaveChanges = async () => {
    try {
      if (!validateForm()) {
        return;
      }

      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrors({ submit: 'Authentication token not found' });
        return;
      }

      // Get current data to get financial record ID
      const currentResponse = await axios.get(
        `http://localhost:5000/api/residents/${residentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const financialRecordId = currentResponse.data.data.financialRecord._id;

      // Update financial record
      const response = await axios.put(
        `http://localhost:5000/api/financial-records/${financialRecordId}`,
        {
          payment_preference: formData.payment_preference,
          account_number: formData.account_number,
          payment_details: formData.payment_details,
          resident_id: residentId
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (response.data.success) {
        // Update resident context
        const updatedResponse = await axios.get(
          `http://localhost:5000/api/residents/${residentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (updatedResponse.data.success) {
          const updatedData = updatedResponse.data.data;
          await updateResidentSection('financialRecord', updatedData.financialRecord);
        }

        navigate(returnPath || '/admin/info/financial', {
          state: { 
            residentId,
            success: true,
            message: 'Financial information updated successfully'
          },
          replace: true
        });
      } else {
        setErrors({ submit: 'Failed to update financial information' });
      }
    } catch (error) {
      console.error('Error updating financial information:', error);
      setErrors({ 
        submit: error.response?.data?.message || 'Failed to update financial information'
      });
    }
  };

  const handleSubmit = async () => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setSubmitError('');

      // Validate all required fields across all pages
      const validationErrors = validateAllFields();
      if (validationErrors.length > 0) {
        const firstError = validationErrors[0];
        setIsSubmitting(false);
        const targetPath = `/admin/registration/${firstError.page}`;
        navigate(targetPath, {
          state: {
            errorMessage: firstError.message,
            errorField: firstError.field
          }
        });
        return;
      }

      const token = getAdminToken();
      if (!token) {
        setSubmitError('Please login to submit the form');
        setIsSubmitting(false);
        navigate('/login', {
          state: {
            returnTo: '/admin/registration/financial',
            message: 'Please login to continue registration'
          }
        });
        return;
      }

      if (!isAdminActive()) {
        clearAuthData();
        setSubmitError('Your account has been deactivated. Please contact the administrator.');
        setIsSubmitting(false);
        navigate('/login', {
          state: {
            message: 'Your account has been deactivated. Please contact the administrator.'
          }
        });
        return;
      }

      // Submit new registration
      const residentSubmitData = {
        residentData: {
          name: registrationData.full_name,
          gender: registrationData.gender.charAt(0).toUpperCase() + registrationData.gender.slice(1),
          date_of_birth: registrationData.date_of_birth,
          personal_contact_number: registrationData.contact_number,
          emergency_contact_name: registrationData.emergency_contact_name,
          emergency_contact_number: registrationData.emergency_contact_number,
          address: registrationData.address,
          photo_url: registrationData.profile_picture,
          status: 'active'
        },
        roomData: {
          room_type: registrationData.room_type,
          room_number: registrationData.room_number,
          special_facilities: registrationData.special_facilities,
          additional_notes: registrationData.room_additional_notes
        },
        guardianData: {
          name: registrationData.guardian_name,
          relationship: registrationData.guardian_relationship,
          guardian_contact_number: registrationData.guardian_contact_number,
          guardian_address: registrationData.guardian_address
        },
        medicalData: {
          medical_history: registrationData.medical_history,
          medical_files: registrationData.medical_files,
          current_medication: registrationData.current_medication,
          physician_name: registrationData.physician_name,
          physician_contact_number: registrationData.physician_contact_number,
          special_needs: registrationData.special_needs,
          insurance_details: registrationData.insurance_details,
          blood_group: registrationData.blood_group
        },
        dietData: {
          dietary_preference: registrationData.dietary_preference,
          food_category: registrationData.food_category,
          food_texture: registrationData.food_texture,
          food_allergies: registrationData.food_allergies,
          special_diet_needs: registrationData.special_diet_needs,
          additional_notes: registrationData.additional_notes
        },
        financialData: {
          payment_preference: formData.payment_preference,
          account_number: formData.account_number,
          payment_details: formData.payment_details
        }
      };

      const response = await api.post('/residents', residentSubmitData);
      if (response.data && response.data.success) {
        navigate('/admin/dashboard', {
          state: { 
            success: true,
            message: 'Resident registered successfully!'
          }
        });
      } else {
        throw new Error('Failed to register resident');
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to register resident. Please try again.';
      
      if (errorMessage.includes('deactivated')) {
        clearAuthData();
        setSubmitError('Your account has been deactivated. Please contact the administrator.');
        navigate('/login', {
          state: {
            message: 'Your account has been deactivated. Please contact the administrator.'
          }
        });
      } else if (error.response?.status === 401) {
        setSubmitError('You must be logged in as an admin to register residents');
        navigate('/login', { 
          state: { 
            returnTo: '/admin/registration/financial',
            message: 'Please login to continue registration'
          }
        });
      } else {
        setSubmitError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
              <Tab active>Financial</Tab>
            </NavigationTabs>
          )}
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Payment Preference: <span style={{ color: '#ff6b6b' }}>*</span></Label>
            <RadioGroup>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="payment_preference" 
                  value="Sponsored"
                  checked={formData.payment_preference === 'Sponsored'}
                  onChange={handleInputChange}
                />
                Sponsored
              </RadioLabel>
              <RadioLabel>
                <RadioInput 
                  type="radio" 
                  name="payment_preference" 
                  value="Subscription"
                  checked={formData.payment_preference === 'Subscription'}
                  onChange={handleInputChange}
                />
                Subscription
              </RadioLabel>
            </RadioGroup>
            {errors.payment_preference && <ErrorText>{errors.payment_preference}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label>Account Number:</Label>
            <Input 
              type="text" 
              name="account_number"
              value={formData.account_number}
              onChange={handleInputChange}
              placeholder="Enter account number (optional)" 
            />
          </FormGroup>

          <FormGroup>
            <Label>Payment Details:</Label>
            <TextArea 
              name="payment_details"
              value={formData.payment_details}
              onChange={handleInputChange}
              placeholder="Enter payment details (optional)" 
              rows="2"
            />
          </FormGroup>

          {errors.submit && (
            <div style={{ color: '#ff6b6b', marginTop: '0.5rem', fontSize: '0.875rem' }}>
              {errors.submit}
            </div>
          )}

          {isEditMode ? (
            <SaveButton 
              onClick={handleSaveChanges}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </SaveButton>
          ) : (
            <SaveButton 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register Resident'}
            </SaveButton>
          )}
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default FinancialPage;
