import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import colors from '../theme/colors';

const PageContainer = styled.div`
  padding: 120px 20px 60px;
  background-color: #0F1914;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(210, 230, 181, 0.1);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  color: ${colors.text.light};
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  font-family: 'istok web';
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: ${colors.primary.green5};
  font-size: 1.5rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #D2E6B5;
  padding-bottom: 10px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #D2E6B5;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #D2E6B5;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #8EB15C;
    box-shadow: 0 0 5px rgba(142, 177, 92, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #D2E6B5;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #8EB15C;
    box-shadow: 0 0 5px rgba(142, 177, 92, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #D2E6B5;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #8EB15C;
    box-shadow: 0 0 5px rgba(142, 177, 92, 0.5);
  }

  option {
    background: #0F1914;
  }
`;

const SubmitButton = styled.button`
  background-color: #D2E6B5;
  color: #0A2A22;
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 50px auto 0;

  &:hover {
    background-color: #8EB15C;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  color: ${props => props.error ? '#ff6b6b' : '#D2E6B5'};
`;

const ResidentApplicationPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Resident Information
    name: '',
    date_of_birth: '',
    gender: '',
    personal_contact_number: '',
    address: '',
    blood_group: '',
    medical_history: '',
    dietary_preferences: '',
    food_category: '',
    food_texture: '',
    room_type: '',

    // Guardian Information
    guardian_name: '',
    guardian_relationship: '',
    guardian_contact_number: '',
    guardian_address: '',

    // Financial Information
    payment_preference: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      await axios.post('/api/resident-applications', formData);
      setMessage('Application submitted successfully! We will contact you soon.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>Resident Application Form</Title>
        <form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Resident Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Full Name *</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Date of Birth *</Label>
                <Input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Gender *</Label>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Contact Number</Label>
                <Input
                  type="tel"
                  name="personal_contact_number"
                  value={formData.personal_contact_number}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Blood Group</Label>
                <Input
                  type="text"
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleChange}
                  placeholder="e.g., A+, B-, O+"
                />
              </FormGroup>
              <FormGroup>
                <Label>Room Type *</Label>
                <Select
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Shared">Shared</option>
                </Select>
              </FormGroup>
            </FormGrid>

            <FormGroup>
              <Label>Address</Label>
              <TextArea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Medical History</Label>
              <TextArea
                name="medical_history"
                value={formData.medical_history}
                onChange={handleChange}
                placeholder="Please list any medical history, allergies, or special needs"
              />
            </FormGroup>

            <SectionTitle>Dietary Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Dietary Preferences *</Label>
                <Select
                  name="dietary_preferences"
                  value={formData.dietary_preferences}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Food Category *</Label>
                <Select
                  name="food_category"
                  value={formData.food_category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Spicy">Spicy</option>
                  <option value="Non-Spicy">Non-Spicy</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Food Texture *</Label>
                <Select
                  name="food_texture"
                  value={formData.food_texture}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Texture</option>
                  <option value="Hard">Hard</option>
                  <option value="Soft">Soft</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
            <SectionTitle>Guardian Information</SectionTitle>
            <FormGrid>
              <FormGroup>
                <Label>Guardian Name *</Label>
                <Input
                  type="text"
                  name="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Relationship to Resident *</Label>
                <Input
                  type="text"
                  name="guardian_relationship"
                  value={formData.guardian_relationship}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Contact Number *</Label>
                <Input
                  type="tel"
                  name="guardian_contact_number"
                  value={formData.guardian_contact_number}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormGrid>
            <FormGroup>
              <Label>Address *</Label>
              <TextArea
                name="guardian_address"
                value={formData.guardian_address}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>Financial Information</SectionTitle>
            <FormGroup>
              <Label>Payment Preference *</Label>
              <Select
                name="payment_preference"
                value={formData.payment_preference}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Preference</option>
                <option value="Sponsored">Sponsored</option>
                <option value="Subscription">Subscription</option>
              </Select>
            </FormGroup>
          </Section>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </SubmitButton>

          {message && (
            <Message error={isError}>{message}</Message>
          )}
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default ResidentApplicationPage;
