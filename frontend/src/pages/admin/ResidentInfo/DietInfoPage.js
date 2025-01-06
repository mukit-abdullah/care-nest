import React from 'react';
import styled from 'styled-components';
import colors from '../../../theme/colors';
import { typography, fonts } from '../../../theme/typography';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaCircle } from 'react-icons/fa';

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

const InfoGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  color: #B1CF86;
`;

const Value = styled.span`
  font-family: ${fonts.secondary};
  font-size: 1.1rem;
  color: #FFFFFF;
  margin-left: 8px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 8px;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.isSelected ? '#B1CF86' : '#FFFFFF'};
`;

const RadioIcon = styled(FaCircle)`
  color: ${props => props.isSelected ? '#B1CF86' : '#FFFFFF'};
  font-size: 0.8rem;
`;

const Title = styled.h1`
  font-family: 'Italiana', serif;
  font-size: 3rem;
  text-align: center;
  color: #B1CF86;
  margin-bottom: 2rem;
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
  const { residentId } = location.state || { residentId: null };

  // Dummy data
  const dietInfo = {
    dietaryPreference: "Vegetarian",
    foodCategory: {
      spiciness: "Non-Spicy",
      texture: "Soft"
    },
    foodAllergies: "Peanuts, Shellfish",
    specialDietNeeds: "Low sodium, Diabetic diet"
  };

  const handleEdit = () => {
    navigate('/admin/registration/diet', { 
      state: { 
        isEditMode: true,
        residentId,
        returnPath: '/admin/info/diet'
      } 
    });
  };

  return (
    <PageContainer>
      <AdminNavbar />
      <TopSection>
        <TopContent>
          <Title>Resident Info</Title>
          
          <NavigationTabs>
            <Tab onClick={() => navigate('/admin/info/personal')}>Personal</Tab>
            <Tab onClick={() => navigate('/admin/info/medical')}>Medical</Tab>
            <Tab active>Diet</Tab>
            <Tab onClick={() => navigate('/admin/info/room')}>Room</Tab>
            <Tab onClick={() => navigate('/admin/info/guardian')}>Guardian</Tab>
            <Tab onClick={() => navigate('/admin/info/financial')}>Financial</Tab>
          </NavigationTabs>
        </TopContent>
        <ActionBar>
          <EditIcon onClick={handleEdit} />
        </ActionBar>
      </TopSection>
      
      <MainContent>
        <InfoContainer>
          <InfoGroup>
            <Label>Dietary Preference: </Label>
            <RadioGroup>
              <RadioItem isSelected={dietInfo.dietaryPreference === "Vegetarian"}>
                <RadioIcon isSelected={dietInfo.dietaryPreference === "Vegetarian"} />
                Vegetarian
              </RadioItem>
              <RadioItem isSelected={dietInfo.dietaryPreference === "Non-Vegetarian"}>
                <RadioIcon isSelected={dietInfo.dietaryPreference === "Non-Vegetarian"} />
                Non-Vegetarian
              </RadioItem>
              <RadioItem isSelected={dietInfo.dietaryPreference === "Vegan"}>
                <RadioIcon isSelected={dietInfo.dietaryPreference === "Vegan"} />
                Vegan
              </RadioItem>
            </RadioGroup>
          </InfoGroup>

          <InfoGroup>
            <Label>Food Category: </Label>
            <div>
              <RadioGroup style={{ marginBottom: '1rem' }}>
                <RadioItem isSelected={dietInfo.foodCategory.spiciness === "Spicy"}>
                  <RadioIcon isSelected={dietInfo.foodCategory.spiciness === "Spicy"} />
                  Spicy
                </RadioItem>
                <RadioItem isSelected={dietInfo.foodCategory.spiciness === "Non-Spicy"}>
                  <RadioIcon isSelected={dietInfo.foodCategory.spiciness === "Non-Spicy"} />
                  Non-Spicy
                </RadioItem>
              </RadioGroup>
              <RadioGroup>
                <RadioItem isSelected={dietInfo.foodCategory.texture === "Hard"}>
                  <RadioIcon isSelected={dietInfo.foodCategory.texture === "Hard"} />
                  Hard
                </RadioItem>
                <RadioItem isSelected={dietInfo.foodCategory.texture === "Soft"}>
                  <RadioIcon isSelected={dietInfo.foodCategory.texture === "Soft"} />
                  Soft
                </RadioItem>
              </RadioGroup>
            </div>
          </InfoGroup>

          <InfoGroup>
            <Label>Food Allergies: </Label>
            <Value>{dietInfo.foodAllergies}</Value>
          </InfoGroup>

          <InfoGroup>
            <Label>Special Diet Needs: </Label>
            <Value>{dietInfo.specialDietNeeds}</Value>
          </InfoGroup>
        </InfoContainer>
      </MainContent>
    </PageContainer>
  );
};

export default DietInfoPage;
