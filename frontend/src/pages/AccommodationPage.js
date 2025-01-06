import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled.div`
  background-color: #0F1914;
  color: #ffffff;
  min-height: 100vh;
  padding-top: 80px;
`;

const HeroSection = styled.section`
  position: relative;
  height: 500px;
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

const RoomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin: 40px 0;
`;

const RoomCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const RoomContent = styled.div`
  padding: 20px;
`;

const RoomTitle = styled.h3`
  font-family: 'istok-web';
  font-size: 1.8rem;
  color: #B1CF86;
  margin-bottom: 15px;
`;

const RoomDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const CommonAreasSection = styled.section`
  margin: 60px 0;
  text-align: center;
`;

const CommonAreasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CommonAreaImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
`;

const CommonAreaDescription = styled.p`
  color: #ffffff;
  line-height: 1.6;
  margin-top: 30px;
  text-align: center;
`;

const AccommodationPage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <HeroSection>
          <HeroImage 
            src="/images/accommodation-hero.jpg" 
            alt="Elderly residents enjoying common area"
          />
        </HeroSection>

        <ContentSection>
          <Title>Accommodation</Title>
          <Description>
            At Care Nest, we provide comfortable and safe living spaces tailored to the needs of our elderly residents. 
            Each room is designed to be easily accessible and includes essential amenities to ensure a home-like environment, 
            promoting independence and well-being.
          </Description>

          <SectionTitle>Indoor</SectionTitle>
          <RoomGrid>
            <RoomCard>
              <RoomImage src="/images/private-room.jpg" alt="Private Room" />
              <RoomContent>
                <RoomTitle>Private Rooms</RoomTitle>
                <RoomDescription>
                  At Care Nest, our private rooms provide spacious, comfortable living spaces with en-suite bathrooms, 
                  emergency call systems, and climate control. Residents can personalize their rooms with their own furnishings 
                  and decor, creating a homely and welcoming environment.
                </RoomDescription>
              </RoomContent>
            </RoomCard>

            <RoomCard>
              <RoomImage src="/images/shared-room.jpg" alt="Shared Room" />
              <RoomContent>
                <RoomTitle>Shared Rooms</RoomTitle>
                <RoomDescription>
                  At Care Nest, our shared rooms provide a comfortable living space where residents can enjoy companionship 
                  while maintaining individual privacy. Each shared room is designed with accessibility features and includes 
                  separate spaces for personal belongings, fostering a sense of community and support.
                </RoomDescription>
              </RoomContent>
            </RoomCard>
          </RoomGrid>

          <SectionTitle>Outdoor</SectionTitle>
          <RoomGrid>
            <RoomCard>
              <RoomImage src="/images/outdoor-spaces.jpg" alt="Outdoor Spaces" />
              <RoomContent>
                <RoomTitle>Outdoor Spaces</RoomTitle>
                <RoomDescription>
                  At Care Nest, our beautifully landscaped outdoor spaces offer residents a unique environment for relaxation 
                  and recreation. With gardens, walking paths, and seating areas, these spaces provide opportunities for fresh air, 
                  gentle exercise, and peaceful moments in a serene setting.
                </RoomDescription>
              </RoomContent>
            </RoomCard>

            <RoomCard>
              <RoomImage src="/images/garden.jpg" alt="Garden" />
              <RoomContent>
                <RoomTitle>Garden</RoomTitle>
                <RoomDescription>
                  At Care Nest, our meticulously maintained gardens offer residents a tranquil retreat where they can connect 
                  with nature. These serene outdoor spaces feature walking paths, seating areas, and a variety of flowers and plants, 
                  providing the perfect setting for relaxation, gentle exercise, and socializing with fellow residents.
                </RoomDescription>
              </RoomContent>
            </RoomCard>
          </RoomGrid>

          <SectionTitle>Common Areas</SectionTitle>
          <CommonAreasSection>
            <CommonAreasGrid>
              <CommonAreaImage src="/images/common-area1.jpg" alt="Common Area" />
              <CommonAreaImage src="/images/common-area2.jpg" alt="Common Area" />
            </CommonAreasGrid>
            <CommonAreaDescription>
              Residents have access to beautifully furnished common areas, including lounges, dining rooms, and gardens, 
              encouraging socialization and recreational activities.
            </CommonAreaDescription>
          </CommonAreasSection>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default AccommodationPage;
