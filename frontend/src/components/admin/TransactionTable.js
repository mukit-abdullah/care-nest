import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import { FaSearch } from 'react-icons/fa';

const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: #A0C172;
  color: ${colors.text.light};
  font-family: 'Istok Web', sans-serif;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 700;
  }
`;

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  background-color: ${colors.primary.green3};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const SearchIcon = styled.span`
  color: ${colors.text.light};
  font-size: 0.9rem;
`;

const SearchBar = styled.div`
  input {
    padding: 0.3rem 0.8rem;
    border: none;
    border-radius: 5px;
    font-size: 0.85rem;
    width: 200px;
    background-color: ${colors.primary.green3};
    color: ${colors.text.light};

    &::placeholder {
      color: ${colors.text.light};
      opacity: 0.7;
    }

    &:focus {
      outline: none;
      background-color: ${colors.primary.green2};
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${colors.primary.green3};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;
`;

const TableHeaderCell = styled.th`
  padding: 0.6rem;
  text-align: center;
  color: black;
  background-color: ${colors.primary.green1};
  font-family: 'Istok Web', sans-serif;
  ${typography.body1};
  font-weight: 700;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #B1CF86;
  border-right: 2px solid #B1CF86;
  
  &:last-child {
    border-right: none;
  }
`;

const TableCell = styled.td`
  padding: 0.6rem;
  text-align: center;
  font-weight: 700;
  color: ${colors.text.dark};
  font-family: 'Istok Web', sans-serif;
  ${typography.body1};
  border-bottom: 2px solid #B1CF86;
  border-right: 2px solid #B1CF86;
  
  &:last-child {
    border-right: none;
  }
  
  tr:last-child & {
    border-bottom: none;
  }
`;

const TableRow = styled.tr`
  background-color: #D2E6B5;
  
  &:hover {
    background-color: ${colors.primary.green4}20;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${colors.primary.green1};
  color: ${colors.text.light};
  font-family: ${fonts.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PageInfo = styled.div`
  ${typography.body2};
`;

const PageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.active ? colors.primary.green5 : colors.primary.green2};
  color: ${props => props.active ? colors.text.dark : colors.text.light};
  cursor: pointer;
  font-family: ${fonts.secondary};
  ${typography.body2};

  &:hover {
    background-color: ${colors.primary.green4};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - replace with actual data from database
  const transactions = [
    {
      id: 1,
      name: 'Rahat Rahman',
      date: '08.06.2024 6:45 pm',
      amount: '10,000',
      method: 'Bkash',
      trxId: 'SD8T61YFD'
    },
    {
      id: 2,
      name: 'Sadman Hossain',
      date: '12.06.2024 8:43 pm',
      amount: '15,000',
      method: 'Bkash',
      trxId: 'URNY6K1S8'
    },
    {
      id: 3,
      name: 'Arnab Banik',
      date: '16.11.2024 3:15 pm',
      amount: '20,000',
      method: 'Bkash',
      trxId: 'WX7PL0V2Z'
    },
    {
      id: 4,
      name: 'Kashem Mia',
      date: '28.08.2024 8:39 pm',
      amount: '2',
      method: 'Bkash',
      trxId: 'BB80LHS3G'
    },
    {
      id: 5,
      name: 'Mukit Abdullah',
      date: '28.08.2024 7:46 am',
      amount: '40,000',
      method: 'Bkash',
      trxId: 'BB80LHS3G'
    }
  ];

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.trxId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <TableContainer>
      <TableHeader>
        <h2>Transaction History</h2>
        <SearchSection>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchBar>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </SearchSection>
      </TableHeader>
      
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <TableHeaderCell>SL</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Date/Time</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Method</TableHeaderCell>
              <TableHeaderCell>TrxID</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{transaction.trxId}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} entries
        </PageInfo>
        <PageButtons>
          <PageButton
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {[...Array(pageCount)].map((_, i) => (
            <PageButton
              key={i + 1}
              onClick={() => paginate(i + 1)}
              active={currentPage === i + 1}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </PageButton>
        </PageButtons>
      </PaginationContainer>
    </TableContainer>
  );
};

export default TransactionTable;
