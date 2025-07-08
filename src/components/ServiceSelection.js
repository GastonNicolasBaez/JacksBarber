import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { Card, LoadingSpinner, ErrorMessage } from '../styles/GlobalStyles';
import { FaCut, FaUserTie, FaBolt, FaMagic } from 'react-icons/fa';

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (max-width: ${theme.sizes.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.md};
  }
`;

const ServiceCard = styled(Card)`
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
    transform: translateY(-8px);
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
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${theme.spacing.md};
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%);
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${theme.shadows.gold};

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    background: ${theme.colors.surface};
    border-radius: ${theme.borderRadius.full};
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
    margin-bottom: ${theme.spacing.sm};
    
    svg {
      font-size: 1.25rem;
    }
  }
`;

const ServiceName = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${theme.sizes.mobile}) {
    font-size: 1.125rem;
  }
`;

const ServiceDescription = styled.p`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: ${theme.spacing.md};
`;

const ServiceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const ServicePrice = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const ServiceDuration = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.xs};
`;

const SectionSubtitle = styled.p`
  text-align: center;
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
  margin-bottom: ${theme.spacing.md};
`;

// Iconos para cada tipo de servicio
const getServiceIcon = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  if (name.includes('corte') && name.includes('barba')) {
    return <FaMagic />;
  } else if (name.includes('corte')) {
    return <FaCut />;
  } else if (name.includes('barba') || name.includes('afeitado')) {
    return <FaUserTie />;
  } else {
    return <FaBolt />;
  }
};

const ServiceSelection = ({ 
  servicios = [], 
  servicioSeleccionado, 
  onServicioSelect, 
  loading = false, 
  error = null 
}) => {
  if (loading) {
    return (
      <div>
        <SectionTitle>Selecciona tu Servicio</SectionTitle>
        <SectionSubtitle>Cargando servicios disponibles...</SectionSubtitle>
        <LoadingSpinner size="60px" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SectionTitle>Selecciona tu Servicio</SectionTitle>
        <ErrorMessage>
          Error al cargar los servicios: {error}
        </ErrorMessage>
      </div>
    );
  }

  if (servicios.length === 0) {
    return (
      <div>
        <SectionTitle>Selecciona tu Servicio</SectionTitle>
        <ErrorMessage>
          No hay servicios disponibles en este momento.
        </ErrorMessage>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <SectionTitle>Selecciona tu Servicio</SectionTitle>
      <SectionSubtitle>
        Elige el servicio que mejor se adapte a tus necesidades
      </SectionSubtitle>
      
      <ServicesGrid>
        {servicios.map((servicio) => (
          <ServiceCard
            key={servicio.id}
            selected={servicioSeleccionado?.id === servicio.id}
            onClick={() => onServicioSelect(servicio)}
          >
            <ServiceIcon>
              {getServiceIcon(servicio.nombre)}
            </ServiceIcon>
            
            <ServiceName>{servicio.nombre}</ServiceName>
            
            <ServiceDescription>
              {servicio.descripcion || 'Servicio profesional de barbería'}
            </ServiceDescription>
            
            <ServiceDetails>
              <ServicePrice>
                ${parseFloat(servicio.precio).toLocaleString('es-AR')}
              </ServicePrice>
              <ServiceDuration>
                {servicio.duracion_minutos} min
              </ServiceDuration>
            </ServiceDetails>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </div>
  );
};

export default ServiceSelection;