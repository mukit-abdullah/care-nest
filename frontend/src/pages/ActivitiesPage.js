import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  background-color: #0A2A22;
  color: #ffffff;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  position: relative;
  height: 400px;
  width: 100%;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: #FFD700;
  text-align: center;
  margin: 40px 0;
`;

const EventsSection = styled.section`
  margin: 60px 0;
`;

const EventsTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #FFD700;
  text-align: center;
  margin-bottom: 40px;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
  height: 100%;
`;

const EventImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const EventContent = styled.div`
  padding: 25px;
`;

const EventTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #FFD700;
  margin-bottom: 15px;
`;

const EventDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const RecreationalSection = styled.section`
  margin: 80px 0;
`;

const RecreationalTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #FFD700;
  text-align: center;
  margin-bottom: 40px;
`;

const RecreationalImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RecreationalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
`;

const RecreationalDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  font-size: 1.1rem;
  text-align: center;
  max-width: 900px;
  margin: 30px auto;
`;

const ActivitiesPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <HeroSection>
          <HeroImage 
            src="/images/activities-hero.jpg" 
            alt="Staff interacting with resident"
          />
        </HeroSection>

        <ContentSection>
          <Title>Interactive Activities</Title>

          <EventsSection>
            <EventsTitle>Events</EventsTitle>
            <EventsGrid>
              <EventCard>
                <EventImage src="/images/indoor-games.jpg" alt="Indoor Games" />
                <EventContent>
                  <EventTitle>Indoor Games</EventTitle>
                  <EventDescription>
                    Indoor games at our care home offer residents enjoyable activities that stimulate 
                    mental agility and social interaction. They provide a fun way to pass time and 
                    foster a sense of camaraderie among residents.
                  </EventDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src="/images/yoga.jpg" alt="Yoga Session" />
                <EventContent>
                  <EventTitle>Yoga</EventTitle>
                  <EventDescription>
                    Yoga at our care home offers residents gentle exercises and relaxation techniques 
                    to enhance flexibility, strength, and mental well-being. It promotes physical health 
                    and inner peace in a supportive and calming environment.
                  </EventDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src="/images/gardening.jpg" alt="Gardening Activity" />
                <EventContent>
                  <EventTitle>Gardening</EventTitle>
                  <EventDescription>
                    Gardening at our care home allows residents to connect with nature, engage in 
                    therapeutic activities, and enjoy the satisfaction of nurturing plants. It provides 
                    a peaceful and meaningful way.
                  </EventDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src="/images/morning-walk.jpg" alt="Morning Walk" />
                <EventContent>
                  <EventTitle>Morning Walk</EventTitle>
                  <EventDescription>
                    Morning walks at our care home provide residents with a refreshing start to their day, 
                    promoting physical activity and enhancing overall well-being. It's a simple yet effective 
                    way to encourage movement and enjoyment of the outdoors in a safe place.
                  </EventDescription>
                </EventContent>
              </EventCard>
            </EventsGrid>
          </EventsSection>

          <RecreationalSection>
            <RecreationalTitle>Recreational Activities</RecreationalTitle>
            <RecreationalImages>
              <RecreationalImage 
                src="/images/recreational1.jpg" 
                alt="Indoor recreational activities"
              />
              <RecreationalImage 
                src="/images/recreational2.jpg" 
                alt="Group activities"
              />
            </RecreationalImages>
            <RecreationalDescription>
              Recreational activities at our care home include a variety of engaging options like arts and crafts, 
              music sessions, and group outings. These activities are designed to promote social interaction, 
              stimulate creativity, and enhance overall well-being among residents.
            </RecreationalDescription>
          </RecreationalSection>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default ActivitiesPage;
