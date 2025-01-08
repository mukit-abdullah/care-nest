import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResidentRegistration } from '../../../context/ResidentRegistrationContext';
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
  const { residentData, updateResidentData, resetResidentData } = useResidentRegistration();

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialize form with context data
  const [formData, setFormData] = useState({
    payment_preference: residentData.payment_preference || '',
    account_number: residentData.account_number || '',
    payment_details: residentData.payment_details || ''
  });

  // Handle error state from navigation
  useEffect(() => {
    if (location.state?.errorField) {
      const newErrors = {};
      if (!formData.payment_preference) {
        newErrors.payment_preference = 'Payment Preference is required';
      }
      setErrors(newErrors);
    }
  }, [location.state, formData]);

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
    setSubmitError('');
  };

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
    updateResidentData('financial', formData);
  };

  const validateAllFields = () => {
    console.log('Validating all required fields...');
    console.log('Current residentData:', residentData);

    const validationErrors = [];

    // Check Personal page required fields
    if (!residentData.full_name || !residentData.gender || !residentData.date_of_birth) {
      const missingFields = [];
      if (!residentData.full_name) missingFields.push({ field: 'full_name', message: 'Full Name' });
      if (!residentData.gender) missingFields.push({ field: 'gender', message: 'Gender (Male/Female)' });
      if (!residentData.date_of_birth) missingFields.push({ field: 'date_of_birth', message: 'Date of Birth' });
      
      missingFields.forEach(field => {
        validationErrors.push({ page: 'personal', message: field.message, field: field.field });
      });
    }

    // Validate gender format
    if (residentData.gender && !['male', 'female'].includes(residentData.gender.charAt(0).toLowerCase() + residentData.gender.slice(1))) {
      validationErrors.push({ page: 'personal', message: 'Gender must be Male or Female', field: 'gender' });
    }

    // Check Diet page required fields
    if (!residentData.dietary_preference) {
      validationErrors.push({ page: 'diet', message: 'Dietary Preference', field: 'dietary_preference' });
    }
    if (!residentData.food_category) {
      validationErrors.push({ page: 'diet', message: 'Food Category', field: 'food_category' });
    }
    if (!residentData.food_texture) {
      validationErrors.push({ page: 'diet', message: 'Food Texture', field: 'food_texture' });
    }

    // Check Room page required fields
    if (!residentData.room_type) {
      validationErrors.push({ page: 'room', message: 'Room Type', field: 'room_type' });
    }
    if (!residentData.room_number) {
      validationErrors.push({ page: 'room', message: 'Room Number', field: 'room_number' });
    }

    // Check current page required fields
    if (!formData.payment_preference) {
      validationErrors.push({ page: 'financial', message: 'Payment Preference', field: 'payment_preference' });
    }

    console.log('Validation result:', validationErrors);
    return validationErrors;
  };

  const handleSubmit = async () => {
    try {
      if (isSubmitting) return; // Prevent double submission
      setIsSubmitting(true);
      setSubmitError('');

      // Check for token
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

      // Check if account is active
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

      // First save current page data
      saveDataBeforeNavigation();

      // Validate all required fields
      const validationErrors = validateAllFields();
      if (validationErrors.length > 0) {
        // Get the first error and navigate to that page
        const firstError = validationErrors[0];
        setIsSubmitting(false);
        // Construct the full path
        const targetPath = `/admin/registration/${firstError.page}`;
        navigate(targetPath, {
          state: {
            isEditMode,
            residentId,
            returnPath,
            errorMessage: firstError.message,
            errorField: firstError.field
          }
        });
        return;
      }

      // If all validations pass, proceed with registration
      const residentSubmitData = {
        residentData: {
          // Personal Information
          name: residentData.full_name,
          gender: residentData.gender.charAt(0).toUpperCase() + residentData.gender.slice(1), // Capitalize first letter
          date_of_birth: residentData.date_of_birth,
          personal_contact_number: residentData.contact_number,
          emergency_contact_name: residentData.emergency_contact_name,
          emergency_contact_number: residentData.emergency_contact_number,
          address: residentData.address,
          photo_url: residentData.profile_picture,
          status: 'active'
        },
        roomData: {
          // Room Information
          room_type: residentData.room_type,
          room_number: residentData.room_number,
          special_facilities: residentData.special_facilities,
          additional_notes: residentData.room_additional_notes
        },
        guardianData: {
          // Guardian Information
          name: residentData.guardian_name,
          relationship: residentData.guardian_relationship,
          guardian_contact_number: residentData.guardian_contact_number,
          guardian_address: residentData.guardian_address
        },
        medicalData: {
          // Medical Information
          medical_history: residentData.medical_history,
          medical_files: residentData.medical_files,
          current_medication: residentData.current_medication,
          physician_name: residentData.physician_name,
          physician_contact_number: residentData.physician_contact_number,
          special_needs: residentData.special_needs,
          insurance_details: residentData.insurance_details,
          blood_group: residentData.blood_group
        },
        dietData: {
          // Diet Information
          dietary_preference: residentData.dietary_preference,
          food_category: residentData.food_category,
          food_texture: residentData.food_texture,
          food_allergies: residentData.food_allergies,
          special_diet_needs: residentData.special_diet_needs,
          additional_notes: residentData.additional_notes
        },
        financialData: {
          // Financial Information
          payment_preference: formData.payment_preference,
          account_number: formData.account_number,
          payment_details: formData.payment_details
        }
      };

      console.log('Submitting resident data:', residentSubmitData);
      try {
        const response = await api.post('/residents', residentSubmitData);
        console.log('API response:', response.data);
        
        if (response.data && response.data.success) {
          resetResidentData();
          navigate('/admin/dashboard', {
            state: { 
              success: true,
              message: 'Resident registered successfully!'
            }
          });
        } else {
          console.error('Invalid response format:', response.data);
          throw new Error('Failed to register resident');
        }
      } catch (error) {
        if (error.response?.data?.message) {
          setSubmitError(error.response.data.message);
        } else {
          setSubmitError('Failed to register resident. Please try again.');
        }
        throw error; // Re-throw to be caught by outer catch
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
          
          <NavigationTabs>
            <Tab onClick={() => handleTabChange('/admin/registration/personal')}>Personal</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/medical')}>Medical</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/diet')}>Diet</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/room')}>Room</Tab>
            <Tab onClick={() => handleTabChange('/admin/registration/guardian')}>Guardian</Tab>
            <Tab active>Financial</Tab>
          </NavigationTabs>
        </TopContent>
      </TopSection>
      
      <MainContent>
        <FormContainer>
          <FormGroup>
            <Label>Payment Preference:</Label>
            {errors.payment_preference && <ErrorText>{errors.payment_preference}</ErrorText>}
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
          </FormGroup>

          <FormGroup>
            <Label>Account Number:</Label>
            {errors.account_number && <ErrorText>{errors.account_number}</ErrorText>}
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
            {errors.payment_details && <ErrorText>{errors.payment_details}</ErrorText>}
            <TextArea 
              name="payment_details"
              value={formData.payment_details}
              onChange={handleInputChange}
              placeholder="Enter payment details (optional)" 
              rows="2"
            />
          </FormGroup>

          {submitError && (
            <FormGroup>
              <ErrorMessage>{submitError}</ErrorMessage>
            </FormGroup>
          )}

          <SaveButton 
            onClick={handleSubmit} 
            disabled={isSubmitting ? "true" : undefined}
          >
            {isSubmitting ? 'Registering...' : 'Register Resident'}
          </SaveButton>
        </FormContainer>
      </MainContent>
    </PageContainer>
  );
};

export default FinancialPage;
