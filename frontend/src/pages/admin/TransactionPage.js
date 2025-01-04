import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import AdminNavbar from '../../components/admin/AdminNavbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${colors.background.light};
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${colors.primary.green5};
  font-family: ${fonts.primary};
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const TransactionPage = () => {
  return (
    <>
      <AdminNavbar />
      <PageContainer>
        <Title>Transactions</Title>
        {/* Transaction content will go here */}
      </PageContainer>
    </>
  );
};

export default TransactionPage;
