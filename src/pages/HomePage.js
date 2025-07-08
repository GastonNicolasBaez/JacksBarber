import React, { useState } from 'react';
import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import BookingSection from '../components/BookingSection';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HomePage = ({ setShowHeroOnly }) => {
  const [showBooking, setShowBooking] = useState(false);

  const handleStartBooking = () => {
    setShowBooking(true);
    setShowHeroOnly(false); // Mostrar header y footer cuando se inicia la reserva
  };

  const handleBackToHero = () => {
    setShowBooking(false);
    setShowHeroOnly(true); // Ocultar header y footer cuando se vuelve al hero
  };

  return (
    <PageContainer>
      {showBooking ? (
        <BookingSection onBackToHero={handleBackToHero} />
      ) : (
        <HeroSection onStartBooking={handleStartBooking} />
      )}
    </PageContainer>
  );
};

export default HomePage;