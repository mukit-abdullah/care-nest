import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const GallerySection = styled.section`
  padding: 80px 20px;
  background-color: #0F1914;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  color: #D2E6B5;
  margin-bottom: 50px;
  font-family: 'istok web';
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 1;

  &:hover img {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const ViewMoreButton = styled.button`
 
  display: block;
  margin: 40px auto 0;
  padding: 10px 25px;
  background-color: #B1CF86;
  font-weight: bold;
  color: #black;
  border: none;
  width: 10rem;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #9DBF70;
    transform: translateY(-2px);
  }
`;

const galleryImages = [
  { src: '/images/gallery1.jpg', alt: 'Residents enjoying activities' },
  { src: '/images/gallery2.jpg', alt: 'Dining area' },
  { src: '/images/gallery3.jpg', alt: 'Garden area' },
  { src: '/images/gallery4.jpg', alt: 'Medical care' }
];

const Gallery = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/gallery');
  };

  return (
    <GallerySection id="gallery">
      <Title>Gallery</Title>
      <GalleryGrid>
        {galleryImages.slice(0, 4).map((image, index) => (
          <GalleryItem key={index}>
            <Image src={image.src} alt={image.alt} />
          </GalleryItem>
        ))}
      </GalleryGrid>
      <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
    </GallerySection>
  );
};

export default Gallery;
