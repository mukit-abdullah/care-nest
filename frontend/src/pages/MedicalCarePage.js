import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { FaBrain, FaBell, FaHeartbeat, FaNotesMedical } from 'react-icons/fa';
import topSectionImage from '../assets/images/ServicesImage/Medical Care/Top Section.jpg';
import drF1Image from '../assets/images/ServicesImage/Medical Care/Dr F 01.jpeg';
import drM1Image from '../assets/images/ServicesImage/Medical Care/Dr M 01.jpeg';
import drM2Image from '../assets/images/ServicesImage/Medical Care/Dr M 02.jpeg';

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

const DoctorsTitle = styled.h2`
  font-family: 'istok-web';
  font-size: 3.5rem;
  color: #B1CF86;
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
  font-family: 'istok-web';
  font-size: 2rem;
  color: #B1CF86;
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
          <HeroImage src={topSectionImage} alt="Professional Medical Care at Care Nest" />
        </HeroSection>

        <ContentSection>
          <Title>Medical Care</Title>
          <Description>
            At Care Nest, we provide 24/7 medical care and support with a dedicated team of healthcare professionals, including nurses and doctors. We offer
            personalized care plans, regular health check-ups, and medication management to ensure each resident's specific health needs are met. Additionally,
            we focus on preventive care and wellness programs, promoting a healthy lifestyle and enhancing the overall quality of life for our residents.
          </Description>

          <SectionTitle>Medical Services At Care Nest</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <IconWrapper>
                <FaBrain />
              </IconWrapper>
              <ServiceTitle>Psychiatry Department</ServiceTitle>
              <ServiceDescription>
                Our psychiatry department provides comprehensive mental health services, including diagnosis, treatment, and counseling for various mental health conditions.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaBell />
              </IconWrapper>
              <ServiceTitle>Emergency Department</ServiceTitle>
              <ServiceDescription>
                Our emergency department is equipped to handle medical emergencies, providing timely and effective care to patients in need.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaHeartbeat />
              </IconWrapper>
              <ServiceTitle>Cardiology Department</ServiceTitle>
              <ServiceDescription>
                Our cardiology department offers specialized care for heart conditions, including diagnosis, treatment, and management of cardiovascular diseases.
              </ServiceDescription>
            </ServiceCard>
            <ServiceCard>
              <IconWrapper>
                <FaNotesMedical />
              </IconWrapper>
              <ServiceTitle>Neurology Department</ServiceTitle>
              <ServiceDescription>
                Our neurology department provides comprehensive care for neurological conditions, including diagnosis, treatment, and management of brain and nervous system disorders.
              </ServiceDescription>
            </ServiceCard>
          </ServicesGrid>

          <DoctorsTitle>Our Medical Team</DoctorsTitle>
          
          <DoctorCard>
            <DoctorInfo align="left">
              <DoctorName>Dr. Sarah Mitchell</DoctorName>
              <DoctorDescription>
                Dr. Sarah Mitchell brings over 15 years of experience in geriatric care. 
                Specializing in elderly healthcare and chronic disease management, she ensures 
                our residents receive comprehensive medical attention tailored to their individual needs.
              </DoctorDescription>
            </DoctorInfo>
            <DoctorImage src={drF1Image} alt="Dr. Sarah Mitchell" align="right" />
          </DoctorCard>

          <DoctorCard imageRight>
            <DoctorImage src={drM1Image} alt="Dr. James Anderson" align="left" />
            <DoctorInfo align="right">
              <DoctorName>Dr. James Anderson</DoctorName>
              <DoctorDescription>
                With extensive experience in internal medicine and geriatric care, Dr. Anderson 
                specializes in managing complex medical conditions and preventive care for elderly 
                patients, ensuring optimal health outcomes for our residents.
              </DoctorDescription>
            </DoctorInfo>
          </DoctorCard>

          <DoctorCard>
            <DoctorInfo align="left">
              <DoctorName>Dr. Michael Roberts</DoctorName>
              <DoctorDescription>
                Dr. Roberts is our specialist in geriatric psychiatry and cognitive health. 
                With his expertise in mental health care for elderly patients, he provides 
                essential support for residents dealing with cognitive and emotional challenges.
              </DoctorDescription>
            </DoctorInfo>
            <DoctorImage src={drM2Image} alt="Dr. Michael Roberts" align="right" />
          </DoctorCard>
        </ContentSection>
      </PageContainer>
    </>
  );
};

export default MedicalCarePage;
