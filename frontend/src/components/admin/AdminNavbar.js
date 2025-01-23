import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/CareNestLogo.png';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import { useAdmin } from '../../context/AdminContext';
import { useResidentRegistration } from '../../context/ResidentRegistrationContext';

const NavbarContainer = styled.nav`
  background-color: ${colors.navbarBg};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.img`
  height: 50px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #D2E6B5;
  font-family: ${fonts.secondary};
  
  .user-name {
    font-weight: 700;
    font-style: italic;
    font-size: 0.95rem;
  }
  
  .profile-icon {
    background-color: ${colors.primary.green2};
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const NavLink = styled(Link)`
  color: #D2E6B5;
  text-decoration: none;
  font-family: ${fonts.secondary};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(210, 230, 181, 0.1);
  }
`;

const LogoutButton = styled.button`
  color: #D2E6B5;
  text-decoration: none;
  font-family: ${fonts.secondary};
  font-size: 0.9rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(210, 230, 181, 0.1);
  }
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  color: #D2E6B5;
  margin-left: 1rem;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const NotificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: -1rem;
  width: 300px;
  background-color: ${colors.navbarBg};
  border: 1px solid #D2E6B5;
  border-radius: 8px;
  padding: 0.1rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const NotificationCard = styled.div`
  padding: 0.8rem;
  border-bottom: 1px solid rgba(210, 230, 181, 0.2);
  cursor: pointer;
  transition: background-color 0.2s;
  

  &:hover {
    background-color: rgba(210, 230, 181, 0.1);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationTitle = styled.div`
  color: #D2E6B5;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const NotificationDate = styled.div`
  color: #888;
  font-size: 0.8rem;
`;

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminData, updateAdminData } = useAdmin();
  const { resetRegistrationData } = useResidentRegistration();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    fetchPendingApplications();

    // Add event listener for notification refresh
    const handleRefresh = () => {
      console.log('Refreshing notifications...');
      fetchPendingApplications();
    };

    window.addEventListener('refreshNotifications', handleRefresh);

    // Cleanup
    return () => {
      window.removeEventListener('refreshNotifications', handleRefresh);
    };
  }, []);

  const fetchPendingApplications = async () => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        console.error('No user data found');
        return;
      }
      const admin = JSON.parse(userData);
      const response = await axios.get('/api/resident-applications', {
        headers: {
          'Authorization': `Bearer ${admin.token}`
        }
      });
      const pending = response.data.filter(app => app.status === 'pending');
      setPendingApplications(pending);
    } catch (error) {
      console.error('Error fetching pending applications:', error);
    }
  };

  const handleNavigation = (path) => {
    // Reset registration data when navigating to any non-registration page
    if (location.pathname.includes('/admin/registration/')) {
      console.log('AdminNavbar - Leaving registration process, resetting data');
      resetRegistrationData();
    }
    navigate(path);
  };

  const handleLogout = () => {
    // Clear admin authentication
    localStorage.removeItem('authToken');
    updateAdminData(null);
    
    // Clear any registration data
    resetRegistrationData();
    
    // Navigate to home page (visitor view)
    navigate('/', { replace: true });
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleApplicationClick = (applicationId) => {
    navigate(`/admin/applications/${applicationId}`);
    setIsNotificationOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <NavbarContainer>
      <LogoSection>
        <Logo 
          src={logo} 
          alt="CareNest Logo" 
          onClick={() => {
            resetRegistrationData();
            navigate('/');
          }} 
          style={{ cursor: 'pointer' }} 
        />
        <UserInfo>
          <span className="user-name">{adminData?.username || 'Admin'}</span>
          <span className="profile-icon">👤</span>
          <NotificationIcon onClick={handleNotificationClick}>
            <i className="fas fa-bell"></i>
            {pendingApplications.length > 0 && (
              <NotificationBadge>{pendingApplications.length}</NotificationBadge>
            )}
            <NotificationDropdown isOpen={isNotificationOpen}>
              {pendingApplications.length === 0 ? (
                <NotificationCard>
                  <NotificationTitle>No pending applications</NotificationTitle>
                </NotificationCard>
              ) : (
                pendingApplications.map(application => (
                  <NotificationCard 
                    key={application._id}
                    onClick={() => handleApplicationClick(application._id)}
                  >
                    <NotificationTitle>{application.name}</NotificationTitle>
                    <NotificationDate>Applied on {formatDate(application.application_date)}</NotificationDate>
                  </NotificationCard>
                ))
              )}
            </NotificationDropdown>
          </NotificationIcon>
        </UserInfo>
      </LogoSection>

      <NavLinks>
        <NavLink to="/admin/dashboard" onClick={() => handleNavigation('/admin/dashboard')}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/meal" onClick={() => handleNavigation('/admin/meal')}>
          Meal
        </NavLink>
        <NavLink to="/admin/transaction" onClick={() => handleNavigation('/admin/transaction')}>
          Transaction
        </NavLink>
        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default AdminNavbar;
