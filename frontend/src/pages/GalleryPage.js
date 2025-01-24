import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import img1 from '../assets/images/Gallery/IMG 1.jpg';
import img2 from '../assets/images/Gallery/IMG 2.jpg';
import img3 from '../assets/images/Gallery/IMG 3.jpg';
import img4 from '../assets/images/Gallery/IMG 4.jpg';
import img5 from '../assets/images/Gallery/IMG 5.jpg';
import img6 from '../assets/images/Gallery/IMG 6.jpg';
import img7 from '../assets/images/Gallery/IMG 7.jpg';
import img8 from '../assets/images/Gallery/IMG 8.jpg';
import img9 from '../assets/images/Gallery/IMG 9.jpg';
import img10 from '../assets/images/Gallery/IMG 10.jpg';
import img11 from '../assets/images/Gallery/IMG 11.jpg';
import img12 from '../assets/images/Gallery/IMG 12.jpg';
import img13 from '../assets/images/Gallery/IMG 13.jpg';
import img14 from '../assets/images/Gallery/IMG 14.jpg';
import img15 from '../assets/images/Gallery/IMG 15.jpg';
import img16 from '../assets/images/Gallery/IMG 16.jpg';

const GalleryPageContainer = styled.div`
  background-color: #0F1914;
  min-height: 100vh;
  padding-top: 80px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  color: #D2E6B5;
  margin: 40px 0;
  font-family: 'Playfair Display', serif;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    
    img {
      transform: scale(1.1);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const galleryImages = [
  {
    src: img1,
    alt: 'Care Nest Facility View 1',
    category: 'Facility'
  },
  {
    src: img2,
    alt: 'Care Nest Facility View 2',
    category: 'Facility'
  },
  {
    src: img3,
    alt: 'Resident Care Services 1',
    category: 'Care Services'
  },
  {
    src: img4,
    alt: 'Resident Care Services 2',
    category: 'Care Services'
  },
  {
    src: img5,
    alt: 'Social Activities 1',
    category: 'Activities'
  },
  {
    src: img6,
    alt: 'Social Activities 2',
    category: 'Activities'
  },
  {
    src: img7,
    alt: 'Medical Care 1',
    category: 'Healthcare'
  },
  {
    src: img8,
    alt: 'Medical Care 2',
    category: 'Healthcare'
  },
  {
    src: img9,
    alt: 'Dining Experience 1',
    category: 'Dining'
  },
  {
    src: img10,
    alt: 'Dining Experience 2',
    category: 'Dining'
  },
  {
    src: img11,
    alt: 'Recreation Activities 1',
    category: 'Recreation'
  },
  {
    src: img12,
    alt: 'Recreation Activities 2',
    category: 'Recreation'
  },
  {
    src: img13,
    alt: 'Accommodation View 1',
    category: 'Accommodation'
  },
  {
    src: img14,
    alt: 'Accommodation View 2',
    category: 'Accommodation'
  },
  {
    src: img15,
    alt: 'Garden Area 1',
    category: 'Outdoor'
  },
  {
    src: img16,
    alt: 'Garden Area 2',
    category: 'Outdoor'
  }
];

const GalleryPage = () => {
  return (
    <>
      <Header />
      <GalleryPageContainer>
        <Title>Gallery</Title>
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem key={index}>
              <Image src={image.src} alt={image.alt} />
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GalleryPageContainer>
    </>
  );
};

export default GalleryPage;
