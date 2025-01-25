import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import topSectionImage from '../assets/images/ServicesImage/Accomodation/Top Section.jpg';
import privateRoomImage from '../assets/images/ServicesImage/Accomodation/Private room.jpeg';
import sharedRoomImage from '../assets/images/ServicesImage/Accomodation/Shared room.jpg';
import outdoorSpaceImage from '../assets/images/ServicesImage/Accomodation/Outdoor Space.jpg';
import gardenImage from '../assets/images/ServicesImage/Accomodation/Garden.jpeg';
import commonArea1Image from '../assets/images/ServicesImage/Accomodation/Common Area 01.jpeg';
import commonArea2Image from '../assets/images/ServicesImage/Accomodation/Common Area 02.jpeg';

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
          <HeroImage src={topSectionImage} alt="Care Nest Accommodation Facilities" />
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
              <RoomImage src={privateRoomImage} alt="Private Room at Care Nest" />
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
              <RoomImage src={sharedRoomImage} alt="Shared Room at Care Nest" />
              <RoomContent>
                <RoomTitle>Shared Rooms</RoomTitle>
                <RoomDescription>
                  Our shared rooms offer a social living environment while maintaining privacy and comfort. 
                  Each resident has their own dedicated space within the room, complete with storage solutions 
                  and access to shared amenities. These rooms are perfect for those who prefer companionship.
                </RoomDescription>
              </RoomContent>
            </RoomCard>
          </RoomGrid>

          <SectionTitle>Outdoor</SectionTitle>
          <RoomGrid>
            <RoomCard>
              <RoomImage src={outdoorSpaceImage} alt="Care Nest Outdoor Recreational Spaces" />
              <RoomContent>
                <RoomTitle>Outdoor Spaces</RoomTitle>
                <RoomDescription>
                  Our well-maintained outdoor spaces provide the perfect setting for relaxation and social activities. 
                  With comfortable seating areas, walking paths, and shaded spots, residents can enjoy fresh air and 
                  natural surroundings in a safe and accessible environment.
                </RoomDescription>
              </RoomContent>
            </RoomCard>

            <RoomCard>
              <RoomImage src={gardenImage} alt="Care Nest Therapeutic Garden" />
              <RoomContent>
                <RoomTitle>Garden</RoomTitle>
                <RoomDescription>
                  Our therapeutic garden is a peaceful sanctuary where residents can connect with nature. 
                  The garden features raised flower beds, sensory plants, and quiet corners for meditation. 
                  It's a perfect space for gardening activities or simply enjoying the outdoors.
                </RoomDescription>
              </RoomContent>
            </RoomCard>
          </RoomGrid>

          <SectionTitle>Common Areas</SectionTitle>
          <CommonAreasSection>
            <CommonAreasGrid>
              <div>
                <CommonAreaImage src={commonArea1Image} alt="Care Nest Common Area Lounge" />
                <CommonAreaDescription>
                  Our spacious common lounges are designed for comfort and social interaction. 
                  These well-furnished spaces provide the perfect setting for residents to relax, 
                  read, watch TV, or engage in group activities with fellow residents.
                </CommonAreaDescription>
              </div>
              <div>
                <CommonAreaImage src={commonArea2Image} alt="Care Nest Community Space" />
                <CommonAreaDescription>
                  The community spaces feature comfortable seating arrangements and modern amenities, 
                  creating a warm and inviting atmosphere where residents can gather, socialize, 
                  and participate in various recreational activities.
                </CommonAreaDescription>
              </div>
            </CommonAreasGrid>
          </CommonAreasSection>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default AccommodationPage;
