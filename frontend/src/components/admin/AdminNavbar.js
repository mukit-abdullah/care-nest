import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/CareNestLogo.png';
import colors from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';

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

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 50px;
  }
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

const AdminNavbar = () => {
  return (
    <NavbarContainer>
      <LeftSection>
        <Logo>
          <img src={logo} alt="CareNest Logo" />
        </Logo>
        <UserInfo>
          <span className="user-name">Admin User</span>
          <div className="profile-icon">
            <span>👤</span>
          </div>
        </UserInfo>
      </LeftSection>

      <NavLinks>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/meal">Meal</NavLink>
        <NavLink to="/admin/transaction">Transaction</NavLink>
        <NavLink to="/logout">Log Out</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default AdminNavbar;
