import React from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/colors';
import { typography, fonts } from '../../theme/typography';
import AdminNavbar from '../../components/admin/AdminNavbar';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0F1914;
`;

const Content = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: ${colors.primary.green5};
  font-family: ${fonts.primary};
  font-size: 2rem;
  padding: 2rem;
  text-align: center;
  width: 100%;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 85%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #D2E6B5;
    border-radius: 2px;
  }
`;

const MealSection = styled.div`
  background-color: ${colors.background.dark};
  border-radius: 15px;
  padding: 2rem;
  flex: 1;
`;

const CategoryHeader = styled.div`
  background-color: #D2E6B5;
  padding: 1rem 2rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 1rem;
  height: 3.5rem;
  
  h2 {
    color: #1F7148;
    font-family: 'Istok Web' ;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ResidentCount = styled.div`
  border: 2px solid #8EB15C;
  border-radius: 10px;
  padding: 0.6rem;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  background-color: ${colors.background.dark};
  
  .number {
    font-size: 1.8rem;
    
    color: #FFFFFF;
    font-family: 'Istok Web';
    line-height: 1;
  }
  
  .label {
    font-size: 0.6rem;
    color: #FFFFFF;
    font-family: 'Istok Web';
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: bold;
  }
`;

const MealGrid = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const MealRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  
  &:last-child {
    padding-bottom: 0.5rem;
  }
  
  .meal-type {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .meal-count {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 2px solid #D2E6B5;
  margin-top: 1rem;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  
  .total-label {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.2rem;
    font-weight: bold;
  }
  
  .total-count {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const GrandTotalSection = styled.div`
  width: 82%;
  max-width: 1300px;
  margin: -1rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  margin-left: calc(5% + 1rem);
  margin-right: calc(5% + 1rem);
  
  .total-label {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.4rem;
    font-weight: bold;
  }
  
  .total-count {
    color: #FFFFFF;
    font-family: 'Istok Web';
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

const MealPage = () => {
  return (
    <>
      <AdminNavbar />
      <PageContainer>
        <Content>
          <Title>Today's Meal</Title>
          <CategoryContainer>
            {/* Vegetarian Section */}
            <MealSection>
              <CategoryHeader>
                <h2>Vegetarian</h2>
              </CategoryHeader>
              <ResidentCount>
                <div className="number">12</div>
                <div className="label">Vegetarian Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Non-Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Hard Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Vegetarian Meals</span>
                <span className="total-count">36</span>
              </TotalSection>
            </MealSection>

            {/* Non-Vegetarian Section */}
            <MealSection>
              <CategoryHeader>
                <h2>Non-Vegetarian</h2>
              </CategoryHeader>
              <ResidentCount>
                <div className="number">12</div>
                <div className="label">Non-Vegetarian Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Non-Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Hard Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Non-Vegetarian Meals</span>
                <span className="total-count">36</span>
              </TotalSection>
            </MealSection>

            {/* Vegan Section */}
            <MealSection>
              <CategoryHeader>
                <h2>Vegan</h2>
              </CategoryHeader>
              <ResidentCount>
                <div className="number">11</div>
                <div className="label">Vegan Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Non-Spicy Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Hard Meal</span>
                  <span className="meal-count">9</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft Meal</span>
                  <span className="meal-count">6</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Vegan Meals</span>
                <span className="total-count">33</span>
              </TotalSection>
            </MealSection>
          </CategoryContainer>
          <GrandTotalSection>
            <span className="total-label">Total Meals</span>
            <span className="total-count">105</span>
          </GrandTotalSection>
        </Content>
      </PageContainer>
    </>
  );
};

export default MealPage;
