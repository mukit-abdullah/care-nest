import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const Container = styled.div`
  padding: 2rem;
  margin-top: 60px;
`;

const Title = styled.h1`
  color: ${colors.primary.green5};
  font-family: ${fonts.primary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  ${typography.h2}
  color: ${colors.text.dark};
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;

  label {
    font-weight: 600;
    color: ${colors.text.dark};
    display: block;
    margin-bottom: 0.5rem;
  }

  span {
    color: ${colors.text.regular};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  margin-top: 1rem;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  background-color: ${props =>
    props.$reject ? colors.error :
    props.$secondary ? colors.primary.green3 : 
    colors.primary.green1};
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    ${typography.h3}
    color: ${colors.text.dark};
    margin-bottom: 1.5rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${colors.primary.green5};
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${colors.text.dark};

  &:focus {
    outline: none;
    border-color: ${colors.primary.green1};
    box-shadow: 0 0 0 2px ${colors.primary.green5};
  }

  &::placeholder {
    color: ${colors.text.light};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${colors.primary.green5};
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  color: ${colors.text.dark};

  &:focus {
    outline: none;
    border-color: ${colors.primary.green1};
    box-shadow: 0 0 0 2px ${colors.primary.green5};
  }

  &::placeholder {
    color: ${colors.text.light};
  }
`;

const ApplicationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const fetchApplicationDetails = async () => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        setError('Please login to view application details');
        navigate('/login');
        return;
      }

      const admin = JSON.parse(userData);
      const response = await axios.get(`/api/resident-applications/${id}`, {
        headers: {
          'Authorization': `Bearer ${admin.token}`
        }
      });

      if (response.data) {
        console.log('Setting application data:', response.data);
        setApplication(response.data);
      } else {
        console.error('No data in response');
        setError('No application data found');
      }
    } catch (err) {
      console.error('Error fetching application:', err);
      setError(err.response?.data?.message || 'Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const handleAssignRoom = async () => {
    if (!roomNumber.trim()) {
      setError('Please enter a room number');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      const requestData = {
        residentData: {
          name: application.name,
          date_of_birth: application.date_of_birth,
          gender: application.gender,
          personal_contact_number: application.personal_contact_number,
          address: application.address,
          emergency_contact_name: application.guardian_name,
          emergency_contact_number: application.guardian_contact_number,
          status: 'active',
          admission_date: new Date().toISOString()
        },
        roomData: {
          room_number: roomNumber,
          room_type: application.room_type?.toLowerCase() || 'single',
          special_facilities: []
        },
        guardianData: {
          name: application.guardian_name,
          relationship: application.guardian_relationship,
          guardian_contact_number: application.guardian_contact_number,
          guardian_address: application.guardian_address
        },
        medicalData: {
          blood_group: application.blood_group,
          medical_history: application.medical_history,
          medical_files_url: [],
          current_medication: [],
          physician_name: '',
          physician_contact_number: '',
          special_needs: '',
          insurance_details: ''         
        },
        dietData: {
          dietary_preference: application.dietary_preferences,
          food_category: application.food_category,
          food_texture: application.food_texture,
          special_diet_needs: '',
          additional_notes: '',
          food_allergies: []
        },
        financialData: {
          payment_preference: application.payment_preference,
          account_number: '',
          payment_details: ''
        }
      };

      await axios.post('/api/residents', requestData, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });

      await axios.patch(`/api/resident-applications/${id}`, {
        status: 'approved',
        room_number: roomNumber,
        review_notes: `Room ${roomNumber} assigned`,
        reviewed_by: userData._id
      }, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });

      window.dispatchEvent(new CustomEvent('refreshNotifications'));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to assign room');
    } finally {
      setProcessing(false);
      setShowModal(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setError('Please provide a reason for rejection');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      
      await axios.patch(`/api/resident-applications/${id}`, {
        status: 'rejected',
        review_notes: rejectReason,
        reviewed_by: userData._id
      }, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
      });

      window.dispatchEvent(new CustomEvent('refreshNotifications'));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Failed to reject application');
    } finally {
      setProcessing(false);
      setShowModal(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    setError('');
    if (type === 'assign') {
      setRoomNumber('');
    } else {
      setRejectReason('');
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  if (!application) {
    return <Container>Application not found</Container>;
  }

  return (
    <Container>
      <Title>Application Details</Title>

      <Section>
        <SectionTitle>Personal Information</SectionTitle>
        <Field>
          <label>Name</label>
          <span>{application.name}</span>
        </Field>
        <Field>
          <label>Date of Birth</label>
          <span>
            {new Date(application.date_of_birth).toLocaleDateString()}
          </span>
        </Field>
        <Field>
          <label>Gender</label>
          <span>{application.gender}</span>
        </Field>
        <Field>
          <label>Contact Number</label>
          <span>{application.personal_contact_number}</span>
        </Field>
        <Field>
          <label>Address</label>
          <span>{application.address}</span>
        </Field>
      </Section>

      <Section>
        <SectionTitle>Medical Information</SectionTitle>
        <Field>
          <label>Blood Group</label>
          <span>{application.blood_group}</span>
        </Field>
        <Field>
          <label>Medical History</label>
          <span>{application.medical_history}</span>
        </Field>
      </Section>

      <Section>
        <SectionTitle>Guardian Information</SectionTitle>
        <Field>
          <label>Guardian Name</label>
          <span>{application.guardian_name}</span>
        </Field>
        <Field>
          <label>Relationship</label>
          <span>{application.guardian_relationship}</span>
        </Field>
        <Field>
          <label>Contact Number</label>
          <span>{application.guardian_contact_number}</span>
        </Field>
        <Field>
          <label>Address</label>
          <span>{application.guardian_address}</span>
        </Field>
      </Section>

      <Section>
        <SectionTitle>Preferences</SectionTitle>
        <Field>
          <label>Room Type</label>
          <span>{application.room_type}</span>
        </Field>
        <Field>
          <label>Dietary Preferences</label>
          <span>{application.dietary_preferences}</span>
        </Field>
        <Field>
          <label>Food Category</label>
          <span>{application.food_category}</span>
        </Field>
        <Field>
          <label>Food Texture</label>
          <span>{application.food_texture}</span>
        </Field>
        <Field>
          <label>Payment Preference</label>
          <span>{application.payment_preference}</span>
        </Field>
      </Section>

      <ButtonContainer>
        <Button onClick={() => openModal('assign')} disabled={processing}>
          Assign Room
        </Button>
        <Button $reject onClick={() => openModal('reject')} disabled={processing}>
          Reject
        </Button>
        <Button $secondary onClick={() => navigate('/admin/dashboard')}>
          Back
        </Button>
      </ButtonContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {showModal && (
        <Modal>
          <ModalContent>
            <h3>{modalType === 'assign' ? 'Assign Room' : 'Reject Application'}</h3>
            
            {modalType === 'assign' ? (
              <Input
                type="text"
                placeholder="Enter room number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                autoFocus
              />
            ) : (
              <TextArea
                placeholder="Enter reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                autoFocus
              />
            )}
            
            <ButtonContainer>
              <Button 
                onClick={modalType === 'assign' ? handleAssignRoom : handleReject} 
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Confirm'}
              </Button>
              <Button $secondary onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </ButtonContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ApplicationDetailsPage;
