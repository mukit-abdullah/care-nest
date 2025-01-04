import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1.5rem;
  background-color: #A0C172;
  color: ${colors.text.light};
  font-family: ${fonts.secondary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 600;
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

const Th = styled.th`
  padding: 0.8rem;
  text-align: left;
  background-color: ${colors.primary.green1};
  color: ${colors.text.dark};
  font-weight: 500;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #B1CF86;
  border-right: 2px solid #B1CF86;
  
  &:last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  padding: 1rem;
  text-align: center;
  color: ${colors.text.dark};
  font-family: ${fonts.secondary};
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

const ResidentImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  display: block;
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

const AvailabilityCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;

const ResidentsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sample data - replace with actual data from database
  const residents = [
    {
      id: '001',
      photo: 'path_to_photo',
      name: 'Shanta Banu',
      dob: '08.06.1965',
      roomNo: '01',
      emergencyContact: '01716742116',
      available: true
    },
    // Add more sample data here
  ];

  // Filter residents based on search term
  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.id.includes(searchTerm) ||
    resident.roomNo.includes(searchTerm)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <TableContainer>
      <TableHeader>
        <h2>Residents</h2>
        <SearchSection>
          <SearchIcon>🔍</SearchIcon>
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
              <Th>SL</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Room</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {currentResidents.map((resident, index) => (
              <TableRow 
                key={resident.id}
              >
                <Td>{index + 1}</Td>
                <Td>{resident.name}</Td>
                <Td>{resident.dob}</Td>
                <Td>{resident.roomNo}</Td>
                <Td>
                  <AvailabilityCheckbox 
                    type="checkbox" 
                    checked={resident.available}
                    readOnly
                  />
                </Td>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredResidents.length)} of {filteredResidents.length} residents
        </PageInfo>
        <PageButtons>
          <PageButton 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => paginate(index + 1)}
              active={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton 
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PageButtons>
      </PaginationContainer>
    </TableContainer>
  );
};

export default ResidentsTable;
