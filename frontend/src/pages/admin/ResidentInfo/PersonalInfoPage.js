import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios'; // Import axios

import { useResident } from '../../../context/ResidentContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
  overflow-x: hidden;
`;

const TopSection = styled.div`
  background-color: #000000;
  width: 100%;
  padding-top: 2rem;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionBar = styled.div`
  width: 100%;
  background-color: #627B3D;
  padding: 1rem ;
  
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const EditIcon = styled(FaEdit)`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const MainContent = styled.div`
  margin-left: 260px;
  padding: 2rem;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
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

const InfoContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

const ImageContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-left: 2rem;
  border: 2px solid #B1CF86;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #1a1a1a;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NoImageText = styled.div`
  color: #B1CF86;
  font-family: ${fonts.secondary};
  text-align: center;
`;

const InfoGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  color: #B1CF86;
`;

const Value = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  color: #FFFFFF;
  margin-left: 8px;
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

const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-family: ${fonts.secondary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;
  color: white;
  background-color: ${props => props.$isActive ? colors.error : colors.primary.green1};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { residentData, setCurrentResidentId, fetchResident } = useResident();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  console.log('PersonalInfoPage - Mount:', {
    locationState: location.state,
    residentData
  });

  // Set current resident ID when page loads
  useEffect(() => {
    if (location.state?.residentId) {
      console.log('PersonalInfoPage - Setting residentId:', location.state.residentId);
      setCurrentResidentId(location.state.residentId);
    }
  }, [location.state?.residentId, setCurrentResidentId]);

  // Render loading state if needed
  if (!residentData || loading) {
    return (
      <PageContainer>
        <AdminNavbar />
        <div style={{ marginTop: '80px', textAlign: 'center', color: '#FFFFFF' }}>
          Loading...
        </div>
      </PageContainer>
    );
  }

  const handleEdit = () => {
    console.log('PersonalInfoPage - handleEdit:', {
      residentData,
      id: residentData?.resident?._id
    });

    navigate('/admin/registration/personal', { 
      state: { 
        isEditMode: true,
        residentId: residentData?.resident?._id,
        returnPath: '/admin/info/personal'
      } 
    });
  };

  const handleTabChange = (path) => {
    navigate(path, { 
      state: { residentId: residentData?.resident?._id },
      replace: true // Use replace to prevent adding to history stack
    });
  };

  const handleStatusToggle = async () => {
    try {
      setUpdating(true);
      const newStatus = residentData?.resident?.status === 'active' ? 'inactive' : 'active';
      
      const response = await axios.patch(
        `/api/residents/${residentData?.resident?._id}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userData')).token}`
          }
        }
      );

      if (response.data.success) {
        // Refetch the resident data to update all components
        await fetchResident(residentData.resident._id);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab active>Personal</Tab>
            <Tab onClick={() => handleTabChange('/admin/info/medical')}>Medical</Tab>
            <Tab onClick={() => handleTabChange('/admin/info/diet')}>Diet</Tab>
            <Tab onClick={() => handleTabChange('/admin/info/room')}>Room</Tab>
            <Tab onClick={() => handleTabChange('/admin/info/guardian')}>Guardian</Tab>
            <Tab onClick={() => handleTabChange('/admin/info/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
        <ActionBar>
          <EditIcon onClick={handleEdit} />
        </ActionBar>
      </TopSection>
      
      <MainContent>
        <InfoContainer>
          <InfoGroup>
            <Label>Full Name: </Label>
            <Value>{residentData.resident.name || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Room No: </Label>
            <Value>{residentData.room.room_number || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Gender: </Label>
            <Value>{residentData.resident.gender || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Date of Birth: </Label>
            <Value>
              {residentData.resident.date_of_birth 
                ? new Date(residentData.resident.date_of_birth).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                : 'Not provided'
              }
            </Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Contact Number: </Label>
            <Value>{residentData.resident.personal_contact_number || 'Not provided'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Emergency Contact Number: </Label>
            <Value>{residentData.resident.emergency_contact_number || 'Not provided'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Address: </Label>
            <Value>{residentData.resident.address || 'Not provided'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Status: </Label>
            <Value>{residentData.resident.status || 'N/A'}</Value>
          </InfoGroup>

          <StatusButton 
            $isActive={residentData?.resident?.status === 'active'}
            onClick={handleStatusToggle}
            disabled={updating}
          >
            {updating ? 'Updating...' : 
              residentData?.resident?.status === 'active' ? 'On Leave' : 'Available Now'}
          </StatusButton>
        </InfoContainer>

        <ImageContainer>
          {residentData.resident.photo_url ? (
            <ProfileImage
              src={`http://localhost:5000${residentData.resident.photo_url}`}
              alt={`${residentData.resident.name}'s profile`}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="error-text">Image not found</div>';
              }}
            />
          ) : (
            <NoImageText>No profile picture</NoImageText>
          )}
        </ImageContainer>
      </MainContent>
    </PageContainer>
  );
};

export default PersonalInfoPage;