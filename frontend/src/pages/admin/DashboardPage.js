import React from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DashboardStats from '../../components/admin/DashboardStats';
import ResidentsTable from '../../components/admin/ResidentsTable';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import { useNavigate } from 'react-router-dom';
import { useResidentRegistration } from '../../context/ResidentRegistrationContext';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #0F1914;
  position: relative;
`;

const Content = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: ${colors.primary.green5};
  font-family: ${fonts.primary};
  font-size: 2rem;
  padding: 2rem;
  text-align: center;
  width: 100%;
`;

const StatsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const AddButton = styled.button`
  position: fixed;
  bottom: 2.5rem;
  right: 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #8EB15C;
  border: 2px solid #B1CF86;
  color: #FFFFFF;
  font-family: 'Istok Web', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: ${props => props.align || 'left'};
  color: #FFFFFF;
  font-family: 'Istok Web';
  
  ${props => props.isPhoto && `
    width: 80px;
    height: 80px;
    padding: 0.5rem;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  `}
`;

const DashboardPage = () => {
  const navigate = useNavigate();
  const { resetRegistrationData } = useResidentRegistration();

  const handleAddResident = () => {
    // Reset any existing registration data before starting new registration
    resetRegistrationData();
    navigate('/admin/registration/personal');
  };

  return (
    <>
      <AdminNavbar />
      <DashboardContainer>
        <Content>
          <Title>Admin Dashboard</Title>
          <StatsWrapper>
            <DashboardStats />
          </StatsWrapper>
          <ResidentsTable />
          <AddButton onClick={handleAddResident}>+</AddButton>
        </Content>
      </DashboardContainer>
    </>
  );
};

export default DashboardPage;
