import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { FaCut, FaStar } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  padding: ${theme.spacing.md} 0;
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, ${theme.colors.accent}10 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: ${theme.sizes.mobile}) {
    padding: ${theme.spacing.sm} 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.sizes.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%);
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${theme.shadows.gold};

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.md};
  }

  svg {
    color: ${theme.colors.accent};
    font-size: 1.5rem;
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${theme.sizes.mobile}) {
    width: 50px;
    height: 50px;
    
    svg {
      font-size: 1.25rem;
    }
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const BrandName = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: 0 0 10px ${theme.colors.accent}30;
  
  @media (max-width: ${theme.sizes.mobile}) {
    letter-spacing: 2px;
  }
`;

const BrandTagline = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: clamp(0.75rem, 2vw, 0.875rem);
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  font-weight: 500;
`;

const DecorationStars = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.1;
  overflow: hidden;

  .star {
    position: absolute;
    color: ${theme.colors.accent};
    animation: twinkle 3s ease-in-out infinite;
    
    &:nth-child(1) {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      top: 60%;
      right: 15%;
      animation-delay: 1s;
    }
    
    &:nth-child(3) {
      bottom: 30%;
      left: 20%;
      animation-delay: 2s;
    }
    
    &:nth-child(4) {
      top: 40%;
      right: 30%;
      animation-delay: 1.5s;
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.1;
      transform: scale(1);
    }
    50% {
      opacity: 0.3;
      transform: scale(1.2);
    }
  }

  @media (max-width: ${theme.sizes.mobile}) {
    display: none;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <DecorationStars>
        <FaStar className="star" size={16} />
        <FaStar className="star" size={12} />
        <FaStar className="star" size={14} />
        <FaStar className="star" size={10} />
      </DecorationStars>
      
      <HeaderContent>
        <Logo>
          <LogoIcon>
            <FaCut />
          </LogoIcon>
          <LogoText>
            <BrandName>Jack's Barber</BrandName>
            <BrandTagline>Barbería Tradicional</BrandTagline>
          </LogoText>
        </Logo>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;