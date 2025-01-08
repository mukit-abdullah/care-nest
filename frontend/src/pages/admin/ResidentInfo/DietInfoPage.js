import React from 'react';
import styled from 'styled-components';
import { fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useResident } from '../../../context/ResidentContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
  overflow-x: hidden;
`;

const TopSection = styled.div`
  background-color: #000000;
  width: 100%;
  padding-top: 2rem;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionBar = styled.div`
  width: 100%;
  background-color: #627B3D;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const EditIcon = styled(FaEdit)`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const MainContent = styled.div`
  margin-left: 260px;
  padding: 2rem;
  color: #FFFFFF;
  max-width: 1200px;
  margin: 0 auto;
`;

const InfoContainer = styled.div`
  max-width: 600px;
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-family: ${fonts.secondary};
  font-size: 1.2rem;
  color: #B1CF86;
  margin-bottom: 0.5rem;
`;

const Value = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  color: #FFFFFF;
  margin-left: 8px;
`;

const Title = styled.h1`
  font-family: 'Italiana', serif;
  font-size: 3rem;
  text-align: center;
  color: #B1CF86;
  margin-bottom: 2rem;
`;

const SuccessMessage = styled.div`
  background-color: rgba(177, 207, 134, 0.2);
  color: #B1CF86;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-align: center;
  border: 1px solid #B1CF86;
`;

const NavigationTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 0 auto;
  padding-bottom: 1rem;
  max-width: 800px;
  width: 100%;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-family: ${fonts.secondary};
  font-size: 1.2rem;
  color: #B1CF86;
  cursor: pointer;
  padding: 0.5rem 1rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.active ? '#B1CF86' : 'transparent'};
    transition: background-color 0.2s;
  }

  &:hover:after {
    background-color: #B1CF86;
  }
`;

const DietInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { residentData, loading } = useResident();
  const residentId = location.state?.residentId;

  const handleEdit = () => {
    navigate('/admin/registration/diet', { 
      state: { 
        isEditMode: true,
        residentId,
        returnPath: '/admin/info/diet',
        dietData: residentData?.diet || null
      } 
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          <NavigationTabs>
            <Tab onClick={() => navigate('/admin/info/personal', { 
              state: { residentId } 
            })}>Personal</Tab>
            <Tab onClick={() => navigate('/admin/info/medical', { 
              state: { residentId } 
            })}>Medical</Tab>
            <Tab onClick={() => navigate('/admin/info/diet', { 
              state: { residentId } 
            })} active>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room', { 
              state: { residentId } 
            })}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian', { 
              state: { residentId } 
            })}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/info/financial', { 
              state: { residentId } 
            })}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
        <ActionBar>
          <EditIcon onClick={handleEdit} />
        </ActionBar>
      </TopSection>

      <MainContent>
        {location.state?.success && (
          <SuccessMessage>{location.state.message}</SuccessMessage>
        )}

        <InfoContainer>
          <Section>
            <SectionTitle>Dietary Preference</SectionTitle>
            <Value>{residentData?.diet?.dietary_preference || 'Not specified'}</Value>
          </Section>

          <Section>
            <SectionTitle>Food Category</SectionTitle>
            <Value>{residentData?.diet?.food_category || 'Not specified'}</Value>
          </Section>

          <Section>
            <SectionTitle>Food Texture</SectionTitle>
            <Value>{residentData?.diet?.food_texture || 'Not specified'}</Value>
          </Section>

          <Section>
            <SectionTitle>Food Allergies</SectionTitle>
            <Value>{residentData?.diet?.food_allergies || 'None'}</Value>
          </Section>

          <Section>
            <SectionTitle>Special Diet Needs</SectionTitle>
            <Value>{residentData?.diet?.special_diet_needs || 'None'}</Value>
          </Section>

          <Section>
            <SectionTitle>Additional Notes</SectionTitle>
            <Value>{residentData?.diet?.additional_notes || 'None'}</Value>
          </Section>
        </InfoContainer>
      </MainContent>
    </PageContainer>
  );
};

export default DietInfoPage;
