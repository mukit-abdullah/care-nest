import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  color: ${colors.background};
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
  color: ${colors.background};
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
    color: ${colors.background};

    &::placeholder {
      color: ${colors.background};
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

const TableCell = styled.td`
  padding: 0.1rem;
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

  .photo-placeholder {
    width: 50px;
    height: 50px;
    background-color: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #666;
    margin: 0 auto;
    font-weight: normal;
  }
`;

const TableHeaderCell = styled.th`
  padding: 0.6rem;
  text-align: center;
  color: black;
  background-color: ${colors.primary.green1};
  font-family: 'Istok Web', sans-serif;
  ${typography.body1};
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 2px solid #B1CF86;
  border-right: 2px solid #B1CF86;
  
  &:last-child {
    border-right: none;
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

const PageNumbers = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${colors.primary.green2};
  color: ${colors.text.light};
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

const PageNumber = styled.span`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${colors.primary.green2};
  color: ${colors.text.light};
  font-family: ${fonts.secondary};
  ${typography.body2};
`;

const AvailabilityCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${colors.primary.green1};
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #1a1a1a;
`;

const NoImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.light};
  font-size: 0.8rem;
  margin: 0 auto;
`;

const columns = [
  { id: 'sl', label: 'SL' },
  { id: 'photo', label: 'Photo' },
  { id: 'name', label: 'Name' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'roomNo', label: 'Room No' },
  { id: 'emergencyContact', label: 'Emergency Contact' },
  { id: 'available', label: 'Available' },
];

const residents = [
  {
    id: '001',
    photo: <div className="photo-placeholder">Photo</div>,
    name: 'Shanta Banu',
    dob: '08.06.1965',
    roomNo: '01',
    emergencyContact: '01716742116',
    available: true
  },
  
  
];

const ResidentsTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(residents);
  const itemsPerPage = 5;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [residentsResponse, roomsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/residents', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/rooms', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (residentsResponse.data.success && roomsResponse.data.success) {
          const roomMap = {};
          roomsResponse.data.data.forEach(room => {
            if (room.resident_id && room.resident_id._id) {
              roomMap[room.resident_id._id] = room.room_number;
            }
          });

          console.log('Room assignments:', roomMap);

          const mappedData = residentsResponse.data.data.map((resident, index) => {
            const residentId = resident._id;
            return {
              id: residentId,
              photo: resident.photo_url ? (
                <img 
                  src={`http://localhost:5000${resident.photo_url}`}
                  alt="Profile"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    objectFit: 'cover',
                    margin: '0 auto',
                    display: 'block',
                    backgroundColor: '#e0e0e0'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="photo-placeholder">Photo</div>';
                  }}
                />
              ) : (
                <div className="photo-placeholder">Photo</div>
              ),
              name: resident.name,
              dob: resident.date_of_birth ? new Date(resident.date_of_birth).toLocaleDateString('en-GB') : 'N/A',
              roomNo: roomMap[residentId] || 'Not Assigned',
              emergencyContact: resident.emergency_contact_number || 'N/A',
              available: resident.status === 'active'
            };
          });

          setTableData(mappedData);
        }
      } catch (error) {
        console.error('Error loading resident data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (id) => {
    console.log('Selected resident:', id);
    navigate('/admin/info/personal', {
      state: { residentId: id }
    });
  };

  // Filter residents based on search term
  const filteredResidents = tableData.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.id.includes(searchTerm) ||
    resident.roomNo.includes(searchTerm) ||
    resident.emergencyContact.includes(searchTerm)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);

  return (
    <TableContainer>
      <TableHeader>
        <h2>Residents</h2>
        <SearchSection>
          <SearchIcon>
            <i className="fas fa-search"></i>
          </SearchIcon>
          <SearchBar>
            <input
              type="text"
              placeholder="Search residents..."
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
              <TableHeaderCell>Photo</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Date of Birth</TableHeaderCell>
              <TableHeaderCell>Room No</TableHeaderCell>
              <TableHeaderCell>Emergency Contact</TableHeaderCell>
              <TableHeaderCell>Available</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {currentResidents.map((resident, index) => (
              <TableRow key={resident.id} onClick={() => handleRowClick(resident.id)}>
                <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell>{resident.photo}</TableCell>
                <TableCell>{resident.name}</TableCell>
                <TableCell>{resident.dob}</TableCell>
                <TableCell>{resident.roomNo}</TableCell>
                <TableCell>{resident.emergencyContact}</TableCell>
                <TableCell>
                  <AvailabilityCheckbox 
                    type="checkbox" 
                    checked={resident.available}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <PaginationContainer>
        <PageInfo>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredResidents.length)} of {filteredResidents.length} entries
        </PageInfo>
        <PageNumbers>
          <PageButton 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </PageButton>
          <PageNumber>{currentPage}</PageNumber>
          <PageButton 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PageNumbers>
      </PaginationContainer>
    </TableContainer>
  );
};

export default ResidentsTable;
