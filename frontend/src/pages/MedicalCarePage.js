import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { FaBrain, FaBell, FaHeartbeat, FaNotesMedical } from 'react-icons/fa';

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

const Description = styled.p`
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 60px;
  color: #ffffff;
`;

const ServicesTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #FFD700;
  text-align: center;
  margin: 60px 0 40px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const ServiceCard = styled.div`
  background: rgba(173, 255, 147, 0.1);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #ADFF93;
  margin-bottom: 15px;
`;

const ServiceName = styled.h3`
  color: #ADFF93;
  font-size: 1.2rem;
  margin: 0;
`;

const DoctorsTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #FFD700;
  text-align: center;
  margin: 80px 0 60px;
`;

const DoctorCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 80px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: ${props => props.imageRight ? '1fr 1fr' : '1fr 1fr'};
  }
`;

const DoctorInfo = styled.div`
  text-align: ${props => props.align};
  padding: 20px;
`;

const DoctorName = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #FFD700;
  margin-bottom: 20px;
`;

const DoctorDescription = styled.p`
  color: #ffffff;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const DoctorImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 15px;
  margin: ${props => props.align === 'right' ? '0 0 0 auto' : '0 auto 0 0'};
`;

const MedicalCarePage = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <HeroSection>
          <HeroImage src="/images/medical-care-hero.jpg" alt="Medical professionals at work" />
        </HeroSection>

        <ContentSection>
          <Title>Medical Care</Title>
          <Description>
            At Care Nest, we provide 24/7 medical care and support with a dedicated team of healthcare professionals, including nurses and doctors. We offer
            personalized care plans, regular health check-ups, and medication management to ensure each resident's specific health needs are met. Additionally,
            we focus on preventive care and wellness programs, promoting a healthy lifestyle and enhancing the overall quality of life for our residents.
          </Description>

          <ServicesTitle>Medical Services At Care Nest</ServicesTitle>
          <ServicesGrid>
            <ServiceCard>
              <IconWrapper>
                <FaBrain />
              </IconWrapper>
              <ServiceName>Psychiatry Department</ServiceName>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaBell />
              </IconWrapper>
              <ServiceName>Emergency Department</ServiceName>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaHeartbeat />
              </IconWrapper>
              <ServiceName>Cardiology Department</ServiceName>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaNotesMedical />
              </IconWrapper>
              <ServiceName>Neurology Department</ServiceName>
            </ServiceCard>
          </ServicesGrid>

          <DoctorsTitle>Our Dedicated Doctors Team</DoctorsTitle>
          
          <DoctorCard>
            <DoctorInfo align="left">
              <DoctorName>Dr. Emily Carter</DoctorName>
              <DoctorDescription>
                A renowned cardiologist specializing in preventive heart care and advanced cardiac imaging, with over 15 years of experience in treating heart diseases and conducting cutting-edge research on hypertension.
              </DoctorDescription>
            </DoctorInfo>
            <DoctorImage src="/images/doctor1.jpg" alt="Dr. Emily Carter" align="right" />
          </DoctorCard>

          <DoctorCard imageRight>
            <DoctorImage src="/images/doctor2.jpg" alt="Dr. Arjun Patel" align="left" />
            <DoctorInfo align="right">
              <DoctorName>Dr. Arjun Patel</DoctorName>
              <DoctorDescription>
                An expert neurologist with a focus on neurodegenerative disorders, particularly Alzheimer's and Parkinson's disease, dedicated to patient care and advancing brain health through innovative treatments.
              </DoctorDescription>
            </DoctorInfo>
          </DoctorCard>

          <DoctorCard>
            <DoctorInfo align="left">
              <DoctorName>Dr. Abir Hasan</DoctorName>
              <DoctorDescription>
                A leading oncologist specializing in cancer immunotherapy and personalized treatment plans, committed to delivering compassionate care and advancing cancer research for better patient outcomes.
              </DoctorDescription>
            </DoctorInfo>
            <DoctorImage src="/images/doctor3.jpg" alt="Dr. Abir Hasan" align="right" />
          </DoctorCard>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default MedicalCarePage;
