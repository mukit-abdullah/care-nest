import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import topSectionImage from '../assets/images/ServicesImage/Interactive Activities/Top Section.jpg';
import indoorGamesImage from '../assets/images/ServicesImage/Interactive Activities/Indoor Games.jpeg';
import yogaImage from '../assets/images/ServicesImage/Interactive Activities/Yoga Session.jpg';
import gardeningImage from '../assets/images/ServicesImage/Interactive Activities/Gardening Activities.jpg';
import morningWalkImage from '../assets/images/ServicesImage/Interactive Activities/Morning Walk.jpg';
import recreationalImage from '../assets/images/ServicesImage/Interactive Activities/Recreational Activities.jpg';
import groupActivitiesImage from '../assets/images/ServicesImage/Interactive Activities/Group Activities.jpeg';

const PageContainer = styled.div`
  background-color: #0F1914;
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
  font-family: 'istok-web';
  font-size: 3.5rem;
  color: #D2E5B6;
  text-align: center;
  margin-bottom: 30px;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 950px;
  margin: 0 auto 60px;
  color: #ffffff;
`;

const SectionTitle = styled.h2`
  font-family: 'istok-web';
  font-size: 3.5rem;
  color: #B1CF86;
  text-align: center;
  margin: 60px 0 30px;
`;

const EventsSection = styled.section`
  margin: 60px 0;
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
  border: 2px solid rgba(256, 256, 256, 0.5);
`;

const EventImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const EventContent = styled.div`
  padding: 25px;
`;

const ActivityTitle = styled.h3`
  font-family: 'istok-web';
  font-size: 1.8rem;
  color: #B1CF86;
  margin-bottom: 15px;
`;

const ActivityDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const RecreationalSection = styled.section`
  margin: 80px 0;
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
  border: 3px solid rgba(256, 256, 256, 0.5);
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
            src={topSectionImage} 
            alt="Interactive Activities at Care Nest"
          />
        </HeroSection>

        <ContentSection>
          <Title>Interactive Activities</Title>

          <EventsSection>
            <SectionTitle>Events</SectionTitle>
            <EventsGrid>
              <EventCard>
                <EventImage src={indoorGamesImage} alt="Engaging Indoor Games at Care Nest" />
                <EventContent>
                  <ActivityTitle>Indoor Games</ActivityTitle>
                  <ActivityDescription>
                    Indoor games at our care home offer residents enjoyable activities that stimulate 
                    mental agility and social interaction. They provide a fun way to pass time and 
                    foster a sense of camaraderie among residents.
                  </ActivityDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src={yogaImage} alt="Therapeutic Yoga Sessions at Care Nest" />
                <EventContent>
                  <ActivityTitle>Yoga</ActivityTitle>
                  <ActivityDescription>
                    Yoga at our care home offers residents gentle exercises and relaxation techniques 
                    to enhance flexibility, strength, and mental well-being. It promotes physical health 
                    and inner peace in a supportive and calming environment.
                  </ActivityDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src={gardeningImage} alt="Therapeutic Gardening Activities at Care Nest" />
                <EventContent>
                  <ActivityTitle>Gardening</ActivityTitle>
                  <ActivityDescription>
                    Gardening at our care home allows residents to connect with nature, engage in 
                    therapeutic activities, and enjoy the satisfaction of nurturing plants. It provides 
                    a peaceful and meaningful way.
                  </ActivityDescription>
                </EventContent>
              </EventCard>

              <EventCard>
                <EventImage src={morningWalkImage} alt="Refreshing Morning Walks at Care Nest" />
                <EventContent>
                  <ActivityTitle>Morning Walk</ActivityTitle>
                  <ActivityDescription>
                    Morning walks at our care home provide residents with a refreshing start to their day, 
                    promoting physical activity and enhancing overall well-being. It's a simple yet effective 
                    way to encourage movement and enjoyment of the outdoors in a safe place.
                  </ActivityDescription>
                </EventContent>
              </EventCard>
            </EventsGrid>
          </EventsSection>

          <RecreationalSection>
            <SectionTitle>Recreational Activities</SectionTitle>
            <RecreationalImages>
              <RecreationalImage src={recreationalImage} alt="Engaging Recreational Activities at Care Nest" />
              <RecreationalImage src={groupActivitiesImage} alt="Group Activities and Social Engagement at Care Nest" />
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
