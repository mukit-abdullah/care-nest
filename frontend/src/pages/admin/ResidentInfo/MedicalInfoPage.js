import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaFilePdf } from 'react-icons/fa';
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

const MedicalInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const residentId = location.state?.residentId || localStorage.getItem('currentResidentId');
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.residentId) {
      localStorage.setItem('currentResidentId', location.state.residentId);
    }
  }, [location.state?.residentId]);

  useEffect(() => {
    const fetchResidentData = async () => {
      console.log('\n=== Starting Medical Info Page Data Load ===');
      console.log('1. Resident ID:', residentId);
      
      if (!residentId) {
        console.log('❌ No resident ID found, using fallback data');
        setLoading(false);
        return;
      }
      
      try {
        console.log('2. Fetching resident data...');
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/residents/${residentId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('3. API Response:', response.data);

        if (response.data.success) {
          const residentData = response.data.data;
          console.log('4. Medical Data:', residentData.medicalRecord);
          setResident(residentData);
        }
      } catch (error) {
        console.error('Error fetching resident:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResidentData();
  }, [residentId]);

  const handleEdit = () => {
    navigate('/admin/registration/medical', { 
      state: { 
        isEditMode: true,
        residentId,
        returnPath: '/admin/info/medical'
      } 
    });
  };

  // Fallback data if no resident data is available
  const medicalInfo = {
    medicalHistory: "N/A",
    blood_group: "N/A",
    currentMedication: "N/A",
    primaryPhysicianName: "N/A",
    primaryPhysicianContact: "",
    medicalInsurance: "N/A",
    specialNeeds: "N/A",
    medicalFiles: ["N/A"],
    insuranceFiles: ["N/A"]
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
            <Tab onClick={() => navigate('/admin/info/personal', { 
              state: { residentId } 
            })}>Personal</Tab>
            <Tab active>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet', { 
              state: { residentId } 
            })}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room', { 
              state: { residentId } 
            })}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian', { 
              state: { residentId } 
            })}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/info/financial', { 
              state: { residentId } 
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
            <Label>Blood Group: </Label>
            <Value>{resident?.medicalRecord?.blood_group || medicalInfo.blood_group}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Medical History: </Label>
            <Value>{resident?.medicalRecord?.medical_history || medicalInfo.medicalHistory}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Current Medication: </Label>
            <Value>
              {resident?.medicalRecord?.current_medication?.join(', ') || medicalInfo.currentMedication}
            </Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Name: </Label>
            <Value>{resident?.medicalRecord?.physician_name || medicalInfo.primaryPhysicianName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Contact: </Label>
            <Value>{resident?.medicalRecord?.physician_contact || medicalInfo.primaryPhysicianContact}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Medical Insurance: </Label>
            <Value>{resident?.medicalRecord?.insurance_details || medicalInfo.medicalInsurance}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Special Needs: </Label>
            <Value>{resident?.medicalRecord?.special_needs || medicalInfo.specialNeeds}</Value>
          </InfoGroup>
        </InfoContainer>

        <FilesContainer>
          <FileSection>
            <SectionTitle>Medical Files:</SectionTitle>
            <FileList>
              {resident?.medicalRecord?.medical_files_url?.length > 0 
                ? resident.medicalRecord.medical_files_url.map((file, index) => (
                    <FileItem key={index}>
                      <FaFilePdf />
                      {file}
                    </FileItem>
                  ))
                : medicalInfo.medicalFiles.map((file, index) => (
                    <FileItem key={index}>
                      <FaFilePdf />
                      {file}
                    </FileItem>
                  ))
              }
            </FileList>
          </FileSection>
          
          <FileSection>
            <SectionTitle>Medical Insurance Details:</SectionTitle>
            <FileList>
              {resident?.medicalRecord?.insurance_files_url?.length > 0
                ? resident.medicalRecord.insurance_files_url.map((file, index) => (
                    <FileItem key={index}>
                      <FaFilePdf />
                      {file}
                    </FileItem>
                  ))
                : medicalInfo.insuranceFiles.map((file, index) => (
                    <FileItem key={index}>
                      <FaFilePdf />
                      {file}
                    </FileItem>
                  ))
              }
            </FileList>
          </FileSection>
        </FilesContainer>
      </MainContent>
    </PageContainer>
  );
};

export default MedicalInfoPage;
