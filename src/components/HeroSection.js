import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { Button } from '../styles/GlobalStyles';
import { FaArrowRight } from 'react-icons/fa';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background};
  overflow: hidden;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.sizes.mobile}) {
    padding: 0 ${theme.spacing.md};
    max-width: 100%;
  }
`;

const LocationBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.secondary};
  color: ${theme.colors.textMuted};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-bottom: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.border};
  
  &::before {
    content: '📍';
    font-size: 0.75rem;
  }
`;

const BrandTitle = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 800;
  color: ${theme.colors.accent};
  letter-spacing: -0.05em;
  margin-bottom: ${theme.spacing.md};
  line-height: 0.95;
  
  @media (max-width: ${theme.sizes.mobile}) {
    font-size: clamp(2.5rem, 12vw, 4rem);
  }
`;

const BrandSubtitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 400;
  color: ${theme.colors.textMuted};
  letter-spacing: 0.15em;
  margin-bottom: ${theme.spacing.xxxl};
  text-transform: uppercase;
  
  @media (max-width: ${theme.sizes.mobile}) {
    letter-spacing: 0.1em;
    margin-bottom: ${theme.spacing.xxl};
  }
`;

const HeroDescription = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: clamp(1.125rem, 2.5vw, 1.25rem);
  color: ${theme.colors.textMuted};
  line-height: 1.7;
  margin-bottom: ${theme.spacing.xxxxl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  letter-spacing: 0.01em;
  
  @media (max-width: ${theme.sizes.mobile}) {
    margin-bottom: ${theme.spacing.xxxl};
  }
`;

const CTASection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
`;

const CTAButton = styled(Button)`
  font-size: 1.125rem;
  padding: 1rem 2.5rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }

  @media (max-width: ${theme.sizes.mobile}) {
    font-size: 1rem;
    padding: 0.875rem 2rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;

  &::after {
    content: '';
    display: block;
    width: 1px;
    height: 24px;
    background: ${theme.colors.border};
    animation: fadeInOut 2s infinite;
  }

  @keyframes fadeInOut {
    0%, 50%, 100% {
      opacity: 0.3;
    }
    25% {
      opacity: 1;
    }
  }

  @media (max-width: ${theme.sizes.mobile}) {
    bottom: ${theme.spacing.lg};
    font-size: 0.75rem;
  }
`;

const HeroSection = ({ onStartBooking }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <LocationBadge>
          Punta Alta, Buenos Aires
        </LocationBadge>
        
        <BrandTitle>Jack's Barber</BrandTitle>
        <BrandSubtitle>Barbería Profesional</BrandSubtitle>
        
        <HeroDescription>
          Experiencia premium en corte y cuidado masculino desde 2017. 
          Tradición, calidad y atención personalizada en cada servicio.
        </HeroDescription>

        <CTASection>
          <CTAButton 
            variant="primary" 
            size="large"
            onClick={onStartBooking}
          >
            Reservar Turno
            <FaArrowRight />
          </CTAButton>
        </CTASection>
      </HeroContent>

      <ScrollIndicator>
        Reserva tu cita
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection;