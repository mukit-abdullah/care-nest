import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import colors from '../theme/colors';

const PageContainer = styled.div`
  background-color: ${colors.background};
  color: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
`;

const ContentContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-family: 'istok-web';
  font-size: 2.5rem;
  color: #D2E6B5;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #D2E6B5;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #8EB15C;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0A2A22;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #D2E6B5;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #8EB15C;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0A2A22;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #D2E6B5;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 15px;
  background-color: #8EB15C;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.primary.green3};
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 100px;
  left: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background-color: transparent;
  border: 2px solid #8EB15C;
  border-radius: 5px;
  color: #8EB15C;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #8EB15C;
    color: #ffffff;
  }

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 20px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 5px;
`;

const SuccessMessage = styled.div`
  color: #51cf66;
  font-size: 0.9rem;
  margin-top: 5px;
  text-align: center;
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    isAnonymous: false,
    message: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateTransactionId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
        name: checked ? 'Anonymous' : prev.name,
        email: checked ? 'anonymous@example.com' : prev.email
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const donationData = {
        donor: {
          name: formData.name || 'Anonymous',
          email: formData.email || 'anonymous@example.com'
        },
        amount: Number(formData.amount),
        currency: 'BDT',
        paymentMethod: 'Bkash Account',
        transactionId: generateTransactionId(),
        isAnonymous: formData.isAnonymous,
        message: formData.message || ''
      };

      const response = await axios.post('/api/donations', donationData);
      
      if (response.data) {
        setSuccess('Donation submitted successfully! Thank you for your generosity.');
        setTimeout(() => {
          navigate('/donation');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <ContentContainer>
          <BackButton onClick={() => navigate('/donation')}>
            <FaArrowLeft /> Back to Donation
          </BackButton>
          <Title>Bkash Payment</Title>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>{success}</SuccessMessage>}
            
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={formData.isAnonymous}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={formData.isAnonymous}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="amount">Amount (BDT) *</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
              />
            </FormGroup>

            <CheckboxGroup>
              <Input
                type="checkbox"
                id="isAnonymous"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
              />
              <Label htmlFor="isAnonymous">Make Anonymous Donation</Label>
            </CheckboxGroup>

            <FormGroup>
              <Label htmlFor="message">Message (Optional)</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message..."
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </SubmitButton>
          </Form>
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default PaymentPage;