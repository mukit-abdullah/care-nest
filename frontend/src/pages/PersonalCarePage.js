import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

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

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  overflow: hidden;
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ServiceContent = styled.div`
  padding: 30px;
`;

const ServiceTitle = styled.h3`
  font-family: 'istok-web';
  font-size: 1.8rem;
  color: #B1CF86;
  margin-bottom: 15px;
`;

const ServiceDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const PersonalCarePage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <HeroSection>
          <HeroImage 
            src="/images/personal-care-hero.jpg" 
            alt="Elderly resident reading a book"
          />
        </HeroSection>

        <ContentSection>
          <Title>Personal Care & Nursing</Title>
          <Description>
            Our Personal Care and Nursing Services ensure residents receive attentive and compassionate support 
            tailored to their unique needs. From daily assistance with activities to professional medical care, 
            we prioritize the health, comfort, and dignity of every individual.
          </Description>

          <SectionTitle>Operational Services</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <ServiceImage src="/images/nursing.jpg" alt="Nursing care" />
              <ServiceContent>
                <ServiceTitle>Nursing</ServiceTitle>
                <ServiceDescription>
                  Our Nursing Services provide professional, round-the-clock care to address residents' medical 
                  needs with expertise and compassion. From medication management to health monitoring, our 
                  dedicated team ensures the well-being and comfort of every individual.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceImage src="/images/laundry.jpg" alt="Laundry service" />
              <ServiceContent>
                <ServiceTitle>Laundry</ServiceTitle>
                <ServiceDescription>
                  The Old Age Home provides a reliable laundry service that ensures residents' clothing is 
                  carefully washed, dried, and folded to their preferences, with special attention to 
                  delicate items for comfort and care.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceImage src="/images/security.jpg" alt="Security system" />
              <ServiceContent>
                <ServiceTitle>Security</ServiceTitle>
                <ServiceDescription>
                  At Care Nest, we prioritize the safety and security of our residents with a comprehensive 
                  system that includes CCTV cameras. Our surveillance system monitors common areas and entrances 24/7, 
                  ensuring a secure environment and providing peace of mind for residents and their families.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>

            <ServiceCard>
              <ServiceImage src="/images/housekeeping.jpg" alt="Housekeeping service" />
              <ServiceContent>
                <ServiceTitle>House Keeping</ServiceTitle>
                <ServiceDescription>
                  At Care Nest, our housekeeping services ensure that residents' living spaces are clean, safe, 
                  and well-maintained. Regular cleaning, laundry, and maintenance tasks are carried out by our 
                  dedicated staff to provide a comfortable and hygienic environment for all residents.
                </ServiceDescription>
              </ServiceContent>
            </ServiceCard>
          </ServicesGrid>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default PersonalCarePage;
