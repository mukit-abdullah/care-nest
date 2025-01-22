import React, { useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaFilePdf } from 'react-icons/fa';
import { useResident } from '../../../context/ResidentContext';
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
  padding: 1rem;
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

const InfoContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

const FilesContainer = styled.div`
  width: 300px;
  margin-left: 2rem;
`;

const FileSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.div`
  color: #B1CF86;
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #627B3D;
`;

const FileList = styled.div`
  width: 100%;
`;

const FileItem = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.secondary};
  font-size: 1rem;
  
  &:hover {
    color: #B1CF86;
    cursor: pointer;
  }
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

const Title = styled.h1`
  font-family: 'Italiana', serif;
  font-size: 3rem;
  text-align: center;
  color: #B1CF86;
  margin-bottom: 2rem;
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

const SuccessMessage = styled.div`
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
  padding: 0.5rem;
  font-size: 0.9rem;
  border-radius: 4px;
  text-align: center;
  width: fit-content;
  margin: 0.5rem auto;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MedicalInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const residentId = location.state?.residentId;
  const { residentData, loading, setCurrentResidentId } = useResident();

  console.log('MedicalInfoPage - Mount:', {
    locationState: location.state,
    residentData
  });

  // Set current resident ID when page loads
  useEffect(() => {
    if (location.state?.residentId) {
      console.log('MedicalInfoPage - Setting residentId:', location.state.residentId);
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
    console.log('MedicalInfoPage - handleEdit:', {
      residentData,
      id: residentData?.resident?._id
    });

    navigate('/admin/registration/medical', { 
      state: { 
        isEditMode: true,
        residentId: residentData?.resident?._id,
        returnPath: '/admin/info/medical'
      } 
    });
  };

  const handleTabChange = (path) => {
    navigate(path, { 
      state: { residentId: residentData?.resident?._id },
      replace: true // Use replace to prevent adding to history stack
    });
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab onClick={() => handleTabChange('/admin/info/personal')}>Personal</Tab>
            <Tab active>Medical</Tab>
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
            <Label>Blood Group: </Label>
            <Value>{residentData?.medicalRecord?.blood_group || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Medical History: </Label>
            <Value>{residentData?.medicalRecord?.medical_history || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Current Medication: </Label>
            <Value>
              {residentData?.medicalRecord?.current_medication?.join(', ') || 'N/A'}
            </Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Name: </Label>
            <Value>{residentData?.medicalRecord?.physician_name || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Contact: </Label>
            <Value>{residentData?.medicalRecord?.physician_contact_number || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Medical Insurance: </Label>
            <Value>{residentData?.medicalRecord?.insurance_details || 'N/A'}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Special Needs: </Label>
            <Value>{residentData?.medicalRecord?.special_needs || 'N/A'}</Value>
          </InfoGroup>
        </InfoContainer>

        <FilesContainer>
          <FileSection>
            <SectionTitle>Medical Files:</SectionTitle>
            <FileList>
              {residentData?.medicalRecord?.medical_files_url?.length > 0 
                ? residentData.medicalRecord.medical_files_url.map((file, index) => (
                    <FileItem key={index}>
                      <FaFilePdf />
                      {file}
                    </FileItem>
                  ))
                : <Value>No files uploaded</Value>
              }
            </FileList>
          </FileSection>
        </FilesContainer>
      </MainContent>
    </PageContainer>
  );
};

export default MedicalInfoPage;
