import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

const TableContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
  background-color: ${colors.primary.green3};
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #A0C172;
  padding: 0.2rem 2rem;
  
  h2 {
    color: ${colors.text.dark};
    font-family: ${fonts.primary};
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const SearchIcon = styled.div`
  color: ${colors.text.dark};
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #D2E6B5;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  
  input {
    background: transparent;
    border: none;
    color: ${colors.text.dark};
    font-family: ${fonts.secondary};
    font-size: 0.85rem;
    padding: 0.15rem;
    width: 250px;
    
    &::placeholder {
      color: ${colors.text.dark}80;
    }
    
    &:focus {
      outline: none;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: ${colors.primary.green3};
  border-radius: 10px;
  overflow: hidden;
  font-family: ${fonts.secondary};
`;

const Th = styled.th`
  padding: 1rem;
  text-align: center;
  color: ${colors.text.light};
  background-color: ${colors.primary.green1};
  font-family: ${fonts.secondary};
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
  background-color: ${props => props.isEven ? colors.primary.green3 : '#D2E6B5'};
  
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
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${colors.primary.green1};
  border-radius: 10px;
  color: ${colors.text.light};
  font-family: ${fonts.secondary};
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
  const [itemsPerPage] = useState(10);

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
              placeholder="Search here..." 
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
              <Th>ID</Th>
              <Th>Photo</Th>
              <Th>Name</Th>
              <Th>DOB</Th>
              <Th>Room No.</Th>
              <Th>Emergency Contact</Th>
              <Th>Available</Th>
            </tr>
          </thead>
          <tbody>
            {currentResidents.map((resident, index) => (
              <TableRow 
                key={resident.id}
                isEven={index % 2 === 1}
              >
                <Td>{resident.id}</Td>
                <Td>
                  <ResidentImage src={resident.photo} alt={resident.name} />
                </Td>
                <Td>{resident.name}</Td>
                <Td>{resident.dob}</Td>
                <Td>{resident.roomNo}</Td>
                <Td>{resident.emergencyContact}</Td>
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
