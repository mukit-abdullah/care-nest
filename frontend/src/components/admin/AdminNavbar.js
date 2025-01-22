import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminData, updateAdminData } = useAdmin();
  const { resetRegistrationData } = useResidentRegistration();

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
