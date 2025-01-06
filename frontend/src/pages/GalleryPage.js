import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const GalleryPageContainer = styled.div`
  background-color: #0A2A22;
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
    src: '/images/gallery1.jpg',
    alt: 'Group of elderly residents enjoying social activities',
    category: 'Social Activities'
  },
  {
    src: '/images/gallery2.jpg',
    alt: 'Residents playing board games together',
    category: 'Recreation'
  },
  {
    src: '/images/gallery3.jpg',
    alt: 'Medical checkup with caring staff',
    category: 'Healthcare'
  },
  {
    src: '/images/gallery4.jpg',
    alt: 'Nurse assisting elderly resident',
    category: 'Care Services'
  },
  // Duplicate the images to fill the grid
  {
    src: '/images/gallery1.jpg',
    alt: 'Group of elderly residents enjoying social activities',
    category: 'Social Activities'
  },
  {
    src: '/images/gallery2.jpg',
    alt: 'Residents playing board games together',
    category: 'Recreation'
  },
  {
    src: '/images/gallery3.jpg',
    alt: 'Medical checkup with caring staff',
    category: 'Healthcare'
  },
  {
    src: '/images/gallery4.jpg',
    alt: 'Nurse assisting elderly resident',
    category: 'Care Services'
  },
  {
    src: '/images/gallery1.jpg',
    alt: 'Group of elderly residents enjoying social activities',
    category: 'Social Activities'
  },
  {
    src: '/images/gallery2.jpg',
    alt: 'Residents playing board games together',
    category: 'Recreation'
  },
  {
    src: '/images/gallery3.jpg',
    alt: 'Medical checkup with caring staff',
    category: 'Healthcare'
  },
  {
    src: '/images/gallery4.jpg',
    alt: 'Nurse assisting elderly resident',
    category: 'Care Services'
  },
  {
    src: '/images/gallery1.jpg',
    alt: 'Group of elderly residents enjoying social activities',
    category: 'Social Activities'
  },
  {
    src: '/images/gallery2.jpg',
    alt: 'Residents playing board games together',
    category: 'Recreation'
  },
  {
    src: '/images/gallery3.jpg',
    alt: 'Medical checkup with caring staff',
    category: 'Healthcare'
  },
  {
    src: '/images/gallery4.jpg',
    alt: 'Nurse assisting elderly resident',
    category: 'Care Services'
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
