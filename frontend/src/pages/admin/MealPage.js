import React, { useState, useEffect } from 'react';
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
    color: ${colors.background};
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

const UnderlinedMealRow = styled(MealRow)`
  border-bottom: 1px solid rgba(210, 230, 181, 0.3);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
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
  const [dietData, setDietData] = useState({
    vegetarian: {
      total: 0,
      spicy: 0,
      nonSpicy: 0,
      hard: 0,
      soft: 0
    },
    nonvegetarian: {
      total: 0,
      spicy: 0,
      nonSpicy: 0,
      hard: 0,
      soft: 0
    },
    vegan: {
      total: 0,
      spicy: 0,
      nonSpicy: 0,
      hard: 0,
      soft: 0
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDietData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:5000/api/diets', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Server response:', errorData);
          throw new Error(`Failed to fetch diet data: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Process the diet data
        const processedData = {
          vegetarian: {
            total: 0,
            spicy: 0,
            nonSpicy: 0,
            hard: 0,
            soft: 0
          },
          nonvegetarian: {
            total: 0,
            spicy: 0,
            nonSpicy: 0,
            hard: 0,
            soft: 0
          },
          vegan: {
            total: 0,
            spicy: 0,
            nonSpicy: 0,
            hard: 0,
            soft: 0
          }
        };

        // Get the diets array from the nested structure
        const diets = data.data || [];
        console.log('Processed diets array:', diets);

        // Process each diet record
        diets.forEach(diet => {
          // Skip if resident is not active
          if (!diet.resident_id || diet.resident_id.status !== 'active') {
            console.log('Skipping inactive/missing resident:', diet.resident_id?._id);
            return;
          }

          // Convert Non-Vegetarian to nonvegetarian for object key compatibility
          const category = diet.dietary_preference.toLowerCase().replace(/-/g, '').replace(/\s+/g, '');
          console.log('Processing active resident diet:', { 
            residentId: diet.resident_id._id,
            residentName: diet.resident_id.name,
            status: diet.resident_id.status,
            category 
          });

          if (processedData[category]) {
            processedData[category].total++;

            if (diet.food_category === 'Spicy') {
              processedData[category].spicy++;
            } else {
              processedData[category].nonSpicy++;
            }

            if (diet.food_texture === 'Hard') {
              processedData[category].hard++;
            } else {
              processedData[category].soft++;
            }
          }
        });

        // Multiply all counts by 3 for daily meals
        Object.keys(processedData).forEach(category => {
          Object.keys(processedData[category]).forEach(key => {
            processedData[category][key] *= 3;
          });
        });

        console.log('Final processed data:', processedData);
        setDietData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching diet data:', err);
        setError('Failed to load meal data');
        setLoading(false);
      }
    };

    fetchDietData();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <AdminNavbar />
        <Content>
          <Title>Loading meal data...</Title>
        </Content>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <AdminNavbar />
        <Content>
          <Title>{error}</Title>
        </Content>
      </PageContainer>
    );
  }

  const grandTotal = Object.values(dietData).reduce(
    (sum, category) => sum + category.total,
    0
  );

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
                <div className="number">{dietData.vegetarian.total / 3}</div>
                <div className="label">Vegetarian Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy</span>
                  <span className="meal-count">{dietData.vegetarian.spicy}</span>
                </MealRow>
                <UnderlinedMealRow>
                  <span className="meal-type">Non-Spicy</span>
                  <span className="meal-count">{dietData.vegetarian.nonSpicy}</span>
                </UnderlinedMealRow>
                <MealRow>
                  <span className="meal-type">Hard</span>
                  <span className="meal-count">{dietData.vegetarian.hard}</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft</span>
                  <span className="meal-count">{dietData.vegetarian.soft}</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Vegetarian</span>
                <span className="total-count">{dietData.vegetarian.total}</span>
              </TotalSection>
            </MealSection>

            {/* Non-Vegetarian Section */}
            <MealSection>
              <CategoryHeader>
                <h2>Non-Vegetarian</h2>
              </CategoryHeader>
              <ResidentCount>
                <div className="number">{dietData.nonvegetarian.total / 3}</div>
                <div className="label">Non-Vegetarian Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy</span>
                  <span className="meal-count">{dietData.nonvegetarian.spicy}</span>
                </MealRow>
                <UnderlinedMealRow>
                  <span className="meal-type">Non-Spicy</span>
                  <span className="meal-count">{dietData.nonvegetarian.nonSpicy}</span>
                </UnderlinedMealRow>
                <MealRow>
                  <span className="meal-type">Hard</span>
                  <span className="meal-count">{dietData.nonvegetarian.hard}</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft</span>
                  <span className="meal-count">{dietData.nonvegetarian.soft}</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Non-Vegetarian</span>
                <span className="total-count">{dietData.nonvegetarian.total}</span>
              </TotalSection>
            </MealSection>

            {/* Vegan Section */}
            <MealSection>
              <CategoryHeader>
                <h2>Vegan</h2>
              </CategoryHeader>
              <ResidentCount>
                <div className="number">{dietData.vegan.total / 3}</div>
                <div className="label">Vegan Residents</div>
              </ResidentCount>
              <MealGrid>
                <MealRow>
                  <span className="meal-type">Spicy</span>
                  <span className="meal-count">{dietData.vegan.spicy}</span>
                </MealRow>
                <UnderlinedMealRow>
                  <span className="meal-type">Non-Spicy</span>
                  <span className="meal-count">{dietData.vegan.nonSpicy}</span>
                </UnderlinedMealRow>
                <MealRow>
                  <span className="meal-type">Hard</span>
                  <span className="meal-count">{dietData.vegan.hard}</span>
                </MealRow>
                <MealRow>
                  <span className="meal-type">Soft</span>
                  <span className="meal-count">{dietData.vegan.soft}</span>
                </MealRow>
              </MealGrid>
              <TotalSection>
                <span className="total-label">Vegan</span>
                <span className="total-count">{dietData.vegan.total}</span>
              </TotalSection>
            </MealSection>
          </CategoryContainer>
          <GrandTotalSection>
            <span className="total-label">Total Meals</span>
            <span className="total-count">{grandTotal}</span>
          </GrandTotalSection>
        </Content>
      </PageContainer>
    </>
  );
};

export default MealPage;
