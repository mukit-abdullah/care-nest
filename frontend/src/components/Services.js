import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ServicesSection = styled.section`
  padding: 80px 20px;
  background-color: #0A2A22;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #FFD700;
  margin-bottom: 50px;
  font-family: 'Playfair Display', serif;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ServiceTitle = styled.h3`
  color: #FFD700;
  margin-bottom: 10px;
  font-size: 1.5rem;
`;

const ServiceDescription = styled.p`
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #FFD700;
  color: #0A2A22;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #FFC000;
    transform: translateY(-2px);
  }
`;

const services = [
  {
    title: 'Accommodation',
    description: 'Comfortable and secure living spaces designed for seniors',
    image: '/images/accommodation.jpg',
    path: '/accommodation'
  },
  {
    title: 'Medical Care',
    description: '24/7 medical support and regular health checkups',
    image: '/images/medical.jpg',
    path: '/medical-care'
  },
  {
    title: 'Healthy Meals',
    description: 'Nutritious and customized meal plans for residents',
    image: '/images/meals.jpg',
    path: '/personal-care'
  },
  {
    title: 'Social Activities',
    description: 'Engaging activities and community events',
    image: '/images/activities.jpg',
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
      <SectionTitle>Services</SectionTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceImage src={service.image} alt={service.title} />
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <Button onClick={() => handleInquire(service)}>
              Inquire More
            </Button>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesSection>
  );
};

export default Services;
