import React from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DashboardStats from '../../components/admin/DashboardStats';
import ResidentsTable from '../../components/admin/ResidentsTable';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background};
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

const DashboardPage = () => {
  return (
    <DashboardContainer>
      <AdminNavbar />
      <Content>
        <Title>Admin Dashboard</Title>
        <StatsWrapper>
          <DashboardStats />
        </StatsWrapper>
        <ResidentsTable />
      </Content>
    </DashboardContainer>
  );
};

export default DashboardPage;
