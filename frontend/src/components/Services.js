import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import accommodationImage from '../assets/images/Landing Page/Accomodation.jpg';
import medicalImage from '../assets/images/Landing Page/Medical Checkup.jpg';
import personalCareImage from '../assets/images/Landing Page/Personal care and nursing.jpg';
import activitiesImage from '../assets/images/Landing Page/Interactive activiries.jpg';
import colors from '../theme/colors';

const ServicesSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  padding-top: 150px
  
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 50px;
  font-family: 'istok web';
  
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 60px;
  max-width: 1350px;
  margin: 0 auto;
  
`;

const ServiceCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  padding: 0 1.5rem;
`;

const Button = styled.button`
  background-color: ${colors.primary.green3};
  color: #0A2A22;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  width: 10rem;
  cursor: pointer;
  font-weight: bold;
  margin: 0 1.5rem 1.5rem;
  transition: background-color 0.3s ease;
  text-align: center;

  &:hover {
    background-color: ${colors.primary.green1};
  }
`;

const services = [
  {
    title: 'Accommodation',
    description: 'Comfortable and secure living spaces designed for seniors',
    image: accommodationImage,
    path: '/accommodation'
  },
  {
    title: 'Medical Care',
    description: '24/7 medical support and regular health checkups',
    image: medicalImage,
    path: '/medical-care'
  },
  {
    title: 'Personal Care',
    description: 'Nutritious and customized meal plans for residents',
    image: personalCareImage,
    path: '/personal-care'
  },
  {
    title: 'Interactive Activities',
    description: 'Engaging activities and community events',
    image: activitiesImage,
    path: '/activities'
  }
];



const Services = () => {
  const navigate = useNavigate();

  const handleInquire = (service) => {
    if (service.path) {
      navigate(service.path);
    }
  };

  return (
    <ServicesSection id="services">
      <SectionTitle>Our Services</SectionTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceImage src={service.image} alt={service.title} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Button onClick={() => handleInquire(service)}>Learn More</Button>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesSection>
  );
};

export default Services;
