import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';

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
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('/api/donations');
        // Sort transactions by date in ascending order
        const sortedTransactions = response.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  if (loading) {
    return (
      <TableContainer>
        <TableHeader>
          <h2>Transaction History</h2>
        </TableHeader>
        <TableWrapper>
          <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>Loading...</div>
        </TableWrapper>
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer>
        <TableHeader>
          <h2>Transaction History</h2>
        </TableHeader>
        <TableWrapper>
          <div style={{ padding: '20px', textAlign: 'center', color: '#ff6b6b' }}>{error}</div>
        </TableWrapper>
      </TableContainer>
    );
  }

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
              placeholder="Search by name or transaction ID..."
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
              <TableHeaderCell>Amount (BDT)</TableHeaderCell>
              <TableHeaderCell>Method</TableHeaderCell>
              <TableHeaderCell>TrxID</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction, index) => (
              <TableRow key={transaction._id}>
                <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell>{transaction.isAnonymous ? 'Anonymous' : transaction.donor.name}</TableCell>
                <TableCell>{moment(transaction.createdAt).format('DD.MM.YYYY h:mm a')}</TableCell>
                <TableCell>{transaction.amount.toLocaleString()}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
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
