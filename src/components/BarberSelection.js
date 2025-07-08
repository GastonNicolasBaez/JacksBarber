import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { Card, LoadingSpinner, ErrorMessage } from '../styles/GlobalStyles';
import { FaUser, FaStar, FaRandom } from 'react-icons/fa';

const BarbersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.sizes.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
  }
`;

const BarberCard = styled(Card)`
  cursor: pointer;
  position: relative;
  padding: ${theme.spacing.lg};
  text-align: center;
  transition: ${theme.transitions.normal};
  border: 2px solid ${props => props.selected ? theme.colors.accent : theme.colors.border};
  background: ${props => props.selected ? 
    `linear-gradient(135deg, ${theme.colors.accent}10 0%, ${theme.colors.surface} 100%)` : 
    theme.colors.surface
  };

  &:hover {
    transform: translateY(-6px);
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.gold};
  }

  ${props => props.selected && `
    box-shadow: ${theme.shadows.gold};
    
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentHover});
      border-radius: ${theme.borderRadius.lg};
      z-index: -1;
    }
  `}

  ${props => props.isAny && `
    border-style: dashed;
    opacity: 0.9;
    
    &:hover {
      opacity: 1;
    }
  `}
`;

const BarberAvatar = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${theme.spacing.md};
  background: ${props => props.isAny ? 
    `linear-gradient(135deg, ${theme.colors.textMuted} 0%, ${theme.colors.border} 100%)` :
    `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)`
  };
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${props => props.isAny ? theme.shadows.md : theme.shadows.gold};

  &::before {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    right: 4px;
    bottom: 4px;
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.full};
  }

  svg {
    color: ${props => props.isAny ? theme.colors.textMuted : theme.colors.accent};
    font-size: 2rem;
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${theme.sizes.mobile}) {
    width: 60px;
    height: 60px;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const BarberName = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${theme.sizes.mobile}) {
    font-size: 1rem;
  }
`;

const BarberDescription = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

const BarberRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.sm};
`;

const StarIcon = styled(FaStar)`
  color: ${theme.colors.accent};
  font-size: 0.875rem;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.sm};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${theme.colors.textMuted};
  font-size: 1rem;
  margin-bottom: ${theme.spacing.xl};
`;

const AnyBarberText = styled.span`
  font-style: italic;
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

const BarberSelection = ({ 
  peluqueros = [], 
  peluqueroSeleccionado, 
  onPeluqueroSelect, 
  loading = false, 
  error = null,
  allowAny = true 
}) => {
  if (loading) {
    return (
      <div>
        <SectionTitle>Elige tu Barbero</SectionTitle>
        <SectionSubtitle>Cargando barberos disponibles...</SectionSubtitle>
        <LoadingSpinner size="60px" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SectionTitle>Elige tu Barbero</SectionTitle>
        <ErrorMessage>
          Error al cargar los barberos: {error}
        </ErrorMessage>
      </div>
    );
  }

  // Crear opción "Cualquier barbero"
  const anyBarberOption = {
    id: null,
    nombre_completo: 'Cualquier Barbero',
    descripcion: 'Te asignaremos el mejor barbero disponible para tu horario',
    isAny: true
  };

  const barbersToShow = allowAny ? [anyBarberOption, ...peluqueros] : peluqueros;

  if (peluqueros.length === 0 && !allowAny) {
    return (
      <div>
        <SectionTitle>Elige tu Barbero</SectionTitle>
        <ErrorMessage>
          No hay barberos disponibles en este momento.
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <SectionTitle>Elige tu Barbero</SectionTitle>
      <SectionSubtitle>
        Selecciona tu barbero preferido o deja que nosotros elijamos
      </SectionSubtitle>
      
      <BarbersGrid>
        {barbersToShow.map((peluquero) => (
          <BarberCard
            key={peluquero.id || 'any'}
            selected={
              (peluqueroSeleccionado?.id === peluquero.id) ||
              (peluqueroSeleccionado === null && peluquero.isAny)
            }
            isAny={peluquero.isAny}
            onClick={() => onPeluqueroSelect(peluquero.isAny ? null : peluquero)}
          >
            <BarberAvatar isAny={peluquero.isAny}>
              {peluquero.isAny ? <FaRandom /> : <FaUser />}
            </BarberAvatar>
            
            <BarberName>{peluquero.nombre_completo}</BarberName>
            
            <BarberDescription>
              {peluquero.isAny ? (
                <AnyBarberText>{peluquero.descripcion}</AnyBarberText>
              ) : (
                peluquero.descripcion || 'Barbero profesional con experiencia'
              )}
            </BarberDescription>
            
            {!peluquero.isAny && (
              <BarberRating>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </BarberRating>
            )}
          </BarberCard>
        ))}
      </BarbersGrid>
    </div>
  );
};

export default BarberSelection;