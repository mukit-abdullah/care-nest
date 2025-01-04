import React from 'react';
import styled from 'styled-components';
import AdminNavbar from '../../components/admin/AdminNavbar';
import TransactionTable from '../../components/admin/TransactionTable';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
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

const TransactionPage = () => {
  return (
    <>
      <AdminNavbar />
      <PageContainer>
        <Content>
          <Title>Transaction</Title>
          <TransactionTable />
        </Content>
      </PageContainer>
    </>
  );
};

export default TransactionPage;
