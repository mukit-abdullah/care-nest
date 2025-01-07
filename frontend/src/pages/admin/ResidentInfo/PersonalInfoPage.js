import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

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

const PersonalInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Try to get residentId from location state first, then fallback to localStorage
  const residentId = location.state?.residentId || localStorage.getItem('currentResidentId');
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  // Store residentId in localStorage when it changes
  useEffect(() => {
    if (location.state?.residentId) {
      localStorage.setItem('currentResidentId', location.state.residentId);
    }
  }, [location.state?.residentId]);

  useEffect(() => {
    const fetchResidentData = async () => {
      console.log('\n=== Starting Resident Info Page Data Load ===');
      console.log('1. Location Object:', location);
      console.log('2. Location State:', location.state);
      console.log('3. Resident ID:', residentId);
      
      if (!residentId) {
        console.log('❌ No resident ID found, using fallback data');
        setLoading(false);
        return;
      }
      
      try {
        console.log('4. Fetching resident data...');
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/residents/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('5. API Response:', response.data);

        if (response.data.success) {
          const residentData = response.data.data;
          
          console.log('6. Resident Data Details:');
          console.log('   - Name:', residentData.resident.name);
          console.log('   - Date of Birth:', residentData.resident.date_of_birth);
          console.log('   - Gender:', residentData.resident.gender);
          console.log('   - Room Number:', residentData.room.room_number);
          console.log('   - Contact:', residentData.resident.personal_contact_number);
          console.log('   - Emergency Contact:', residentData.resident.emergency_contact_number);
          console.log('   - Address:', residentData.resident.address);
          console.log('   - Status:', residentData.resident.status);
          
          setResident(residentData);
        } else {
          console.log('❌ API request succeeded but returned error:', response.data.message);
        }
      } catch (error) {
        console.log('❌ Error fetching resident data:');
        console.log('   Error message:', error.message);
        console.log('   Error details:', error);
      } finally {
        setLoading(false);
        console.log('=== End of Data Load ===\n');
      }
    };

    fetchResidentData();
  }, [residentId, location]);

  const handleEdit = () => {
    console.log('\n=== Edit Navigation ===');
    const editState = { 
      isEditMode: true,
      residentId: residentId,
      returnPath: '/admin/info/personal'
    };
    console.log('Navigating to edit with state:', editState);
    
    navigate('/admin/registration/personal', { state: editState });
  };

  // Use resident data if available, otherwise use dummy data
  const personalInfo = resident || {
    fullName: "N/A",
    roomNo: "-1",
    gender: "N/A",
    dateOfBirth: "00.00.9999",
    contactNumber: "",
    emergencyContactName: "N/A",
    emergencyContactNumber: "",
    address: "N/A",
    profilePicture: "profile1.jpg"
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab active>Personal</Tab>
            <Tab onClick={() => navigate('/admin/info/medical', { 
              state: { residentId: residentId } 
            })}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet', { 
              state: { residentId: residentId } 
            })}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room', { 
              state: { residentId: residentId } 
            })}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian', { 
              state: { residentId: residentId } 
            })}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/info/financial', { 
              state: { residentId: residentId } 
            })}>Financial</Tab>
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
            <Value>{resident?.resident.name || personalInfo.fullName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Room No: </Label>
            <Value>{resident?.room.room_number || personalInfo.roomNo}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Gender: </Label>
            <Value>{resident?.resident.gender || personalInfo.gender}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Date of Birth: </Label>
            <Value>
              {resident?.resident.date_of_birth 
                ? new Date(resident.resident.date_of_birth).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                : personalInfo.dateOfBirth
              }
            </Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Contact Number: </Label>
            <Value>{resident?.resident.personal_contact_number || personalInfo.contactNumber}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Emergency Contact Number: </Label>
            <Value>{resident?.resident.emergency_contact_number || personalInfo.emergencyContactNumber}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Address: </Label>
            <Value>{resident?.resident.address || personalInfo.address}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Status: </Label>
            <Value>{resident?.resident.status || 'N/A'}</Value>
          </InfoGroup>
        </InfoContainer>
        <ImageContainer>
          <img 
            src={resident?.resident.photo_url || personalInfo.profilePicture} 
            alt="Profile" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'cover' 
            }} 
          />
        </ImageContainer>
      </MainContent>
    </PageContainer>
  );
};

export default PersonalInfoPage;
