import React from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaFilePdf } from 'react-icons/fa';

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

  // Dummy data
  const medicalInfo = {
    medicalHistory: "Hypertension, Diabetes Type 2",
    currentMedication: "Metformin 500mg, Lisinopril 10mg",
    primaryPhysicianName: "Dr. Rafiqul Islam",
    primaryPhysicianContact: "01912345678",
    medicalInsurance: "Health Care Ltd. Policy#12345",
    specialNeeds: "Regular blood sugar monitoring, Low-salt diet",
    medicalFiles: [
      "Medical_Report_2024.pdf",
      "Blood_Test_Results_Dec2024.pdf",
      "Prescription_Jan2025.pdf"
    ],
    insuranceFiles: [
      "Insurance_Policy_2024.pdf",
      "Coverage_Details.pdf",
      "Claims_History.pdf"
    ]
  };

  const handleEdit = () => {
    navigate('/admin/registration/medical');
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab onClick={() => navigate('/admin/info/personal')}>Personal</Tab>
            <Tab active>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet')}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room')}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian')}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/info/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
        <ActionBar>
          <EditIcon onClick={handleEdit} />
        </ActionBar>
      </TopSection>
      
      <MainContent>
        <InfoContainer>
          <InfoGroup>
            <Label>Medical History: </Label>
            <Value>{medicalInfo.medicalHistory}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Current Medication: </Label>
            <Value>{medicalInfo.currentMedication}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Name: </Label>
            <Value>{medicalInfo.primaryPhysicianName}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Primary Physician Contact: </Label>
            <Value>{medicalInfo.primaryPhysicianContact}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Medical Insurance: </Label>
            <Value>{medicalInfo.medicalInsurance}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Special Needs: </Label>
            <Value>{medicalInfo.specialNeeds}</Value>
          </InfoGroup>
        </InfoContainer>
        <FilesContainer>
          <FileSection>
            <SectionTitle>Medical Files:</SectionTitle>
            <FileList>
              {medicalInfo.medicalFiles.map((file, index) => (
                <FileItem key={index}>
                  <FaFilePdf />
                  {file}
                </FileItem>
              ))}
            </FileList>
          </FileSection>
          
          <FileSection>
            <SectionTitle>Medical Insurance Details:</SectionTitle>
            <FileList>
              {medicalInfo.insuranceFiles.map((file, index) => (
                <FileItem key={index}>
                  <FaFilePdf />
                  {file}
                </FileItem>
              ))}
            </FileList>
          </FileSection>
        </FilesContainer>
      </MainContent>
    </PageContainer>
  );
};

export default MedicalInfoPage;
