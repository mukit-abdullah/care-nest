import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Testimonial1 from '../assets/images/Testimonial/TestimonialDefault.jpg';
import Testimonial2 from '../assets/images/Testimonial/Testimonial2.jpg';
import Testimonial3 from '../assets/images/Testimonial/Testimonial3.jpg';

const TestimonialSection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
  padding-top: 200px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 50px;
  font-family: 'istok web';
`;

const ImageSliderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
`;

const ImageSlider = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 2.2px solid rgba(256, 256, 256, 0.9);
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#D2E6B5' : 'rgba(210, 230, 181, 0.3)'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  
  &:hover {
    transform: scale(1.2);
  }
`;

const Testimonial = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonialImages = [Testimonial1, Testimonial2, Testimonial3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TestimonialSection id="testimonial">
      <Title>Testimonial</Title>
      <ImageSliderContainer>
        <ImageSlider>
          {testimonialImages.map((image, index) => (
            <SlideImage
              key={index}
              src={image}
              active={currentSlide === index}
              alt={`Testimonial ${index + 1}`}
            />
          ))}
        </ImageSlider>
        <SliderDots>
          {testimonialImages.map((_, index) => (
            <Dot
              key={index}
              active={currentSlide === index}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </SliderDots>
      </ImageSliderContainer>
    </TestimonialSection>
  );
};

export default Testimonial;
