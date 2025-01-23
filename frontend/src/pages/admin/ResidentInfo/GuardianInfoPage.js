import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
//import axios from 'axios';
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
  max-width: 1200px;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  max-width: 600px;
  width: 100%;
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

const GuardianInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const residentId = location.state?.residentId || localStorage.getItem('currentResidentId');
  const { residentData, loading, fetchResident, updateResidentSection } = useResident();

  useEffect(() => {
    if (location.state?.residentId) {
      localStorage.setItem('currentResidentId', location.state.residentId);
    }
  }, [location.state?.residentId]);

  useEffect(() => {
    if (!residentData && residentId) {
      fetchResident(residentId);
    }
  }, [residentId, residentData, fetchResident]);

  // Update local state if we get updated data from navigation
  useEffect(() => {
    if (location.state?.updatedGuardian) {
      updateResidentSection('guardian', location.state.updatedGuardian);
    }
  }, [location.state?.updatedGuardian, updateResidentSection]);

  const guardianInfo = {
    name: "N/A",
    relationship: "N/A",
    guardian_contact_number: "N/A",
    guardian_address: "N/A"
  };

  const handleEdit = () => {
    navigate('/admin/registration/guardian', { 
      state: { 
        isEditMode: true,
        residentId,
        returnPath: '/admin/info/guardian'
      } 
    });
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
            <Tab onClick={() => navigate('/admin/info/medical', { 
              state: { residentId } 
            })}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet', { 
              state: { residentId } 
            })}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room', { 
              state: { residentId } 
            })}>Room</Tab>
            <Tab active>Guardian</Tab>
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
        {location.state?.success && (
          <SuccessMessage>
            {location.state.message}
          </SuccessMessage>
        )}
        <InfoContainer>
          <InfoGroup>
            <Label>Guardian Name: </Label>
            <Value>{residentData?.guardian?.name || guardianInfo.name}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Relationship to Resident: </Label>
            <Value>{residentData?.guardian?.relationship || guardianInfo.relationship}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Guardian Contact Number: </Label>
            <Value>{residentData?.guardian?.guardian_contact_number || guardianInfo.guardian_contact_number}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Guardian Address: </Label>
            <Value>{residentData?.guardian?.guardian_address || guardianInfo.guardian_address}</Value>
          </InfoGroup>
        </InfoContainer>
      </MainContent>
    </PageContainer>
  );
};

const SuccessMessage = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  text-align: center;
`;

export default GuardianInfoPage;
