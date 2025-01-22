import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaCircle } from 'react-icons/fa';
import axios from 'axios';
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

const StyledRadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 8px;
`;

const StyledRadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.selected ? '#B1CF86' : '#FFFFFF'};
`;

const StyledRadioIcon = styled(FaCircle)`
  color: ${props => props.selected ? '#B1CF86' : '#FFFFFF'};
  font-size: 0.8rem;
`;

const RadioItem = ({ isSelected, children, ...props }) => (
  <StyledRadioItem selected={isSelected} {...props}>
    {children}
  </StyledRadioItem>
);

const RadioIcon = ({ isSelected, ...props }) => (
  <StyledRadioIcon selected={isSelected} {...props} />
);

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

const FinancialInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { residentData, loading, setCurrentResidentId, currentResidentId } = useResident();
 
  useEffect(() => {
    if (location.state?.residentId) {
      localStorage.setItem('currentResidentId', location.state.residentId);
    }
  }, [location.state?.residentId]);


  // Fallback data if no resident data is available
  const financialInfo = {
    payment_preference: "N/A",
    account_number: "N/A",
    payment_details: "N/A"
  };

  const handleEdit = () => {
    navigate('/admin/registration/financial', { 
      state: { 
        isEditMode: true,
        residentId: currentResidentId,  // Changed from currentResidentId to residentId
        returnPath: '/admin/info/financial'
      } 
    });
  };

  if (loading) {
    return (
      <PageContainer>
        <AdminNavbar />
        <div style={{ marginTop: '80px', textAlign: 'center', color: '#FFFFFF' }}>
          Loading...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab onClick={() => navigate('/admin/info/personal', { 
              state: { currentResidentId } 
            })}>Personal</Tab>
            <Tab onClick={() => navigate('/admin/info/medical', { 
              state: { currentResidentId } 
            })}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet', { 
              state: { currentResidentId } 
            })}>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room', { 
              state: { currentResidentId } 
            })}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian', { 
              state: { currentResidentId } 
            })}>Guardian</Tab>
            <Tab active>Financial</Tab>
          </NavigationTabs>
        </TopContent>
        <ActionBar>
          <EditIcon onClick={handleEdit} />
        </ActionBar>
      </TopSection>
      
      <MainContent>
        <InfoContainer>
          <InfoGroup>
            <Label>Payment Preference: </Label>
            <StyledRadioGroup>
              <RadioItem isSelected={residentData?.payment_preference === "Sponsored"}>
                <RadioIcon isSelected={residentData?.financialRecord?.payment_preference === "Sponsored"} />
                Sponsored
              </RadioItem>
              <RadioItem isSelected={residentData?.financialRecord?.payment_preference === "Subscription"}>
                <RadioIcon isSelected={residentData?.financialRecord?.payment_preference === "Subscription"} />
                Subscription
              </RadioItem>
            </StyledRadioGroup>
          </InfoGroup>

          <InfoGroup>
            <Label>Account Number: </Label>
            <Value>{residentData?.financialRecord?.account_number || financialInfo.account_number}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Payment Details: </Label>
            <Value>{residentData?.financialRecord?.payment_details || financialInfo.payment_details}</Value>
          </InfoGroup>
        </InfoContainer>
      </MainContent>
    </PageContainer>
  );
};

export default FinancialInfoPage;
