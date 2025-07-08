import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

const CardContainer = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
    transform: translateY(-2px);
  }
  
  ${props => props.selected && `
    border-color: ${theme.colors.accent};
    background: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.accent};
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg};
`;

const ServiceIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.accent};
  font-size: 1.25rem;
  transition: ${theme.transitions.fast};
  
  ${props => props.selected && `
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
  `}
`;

const ServiceTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.25rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  line-height: 1.2;
`;

const ServiceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ServicePrice = styled.div`
  font-family: ${theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  letter-spacing: -0.01em;
`;

const ServiceDuration = styled.div`
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &::before {
    content: '⏱';
    font-size: 0.75rem;
  }
`;

const ServiceDescription = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  line-height: 1.5;
  margin: ${theme.spacing.md} 0 0 0;
`;

const SelectionIndicator = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  transition: ${theme.transitions.fast};
  
  ${props => props.selected && `
    border-color: ${theme.colors.accent};
    background: ${theme.colors.accent};
    
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: ${theme.colors.primary};
      font-size: 0.75rem;
      font-weight: 600;
    }
  `}
`;

const ServiceCard = ({ 
  service, 
  selected, 
  onClick, 
  icon, 
  showDescription = false 
}) => {
  return (
    <CardContainer 
      selected={selected}
      onClick={() => onClick(service)}
    >
      <SelectionIndicator selected={selected} />
      
      <CardHeader>
        <ServiceIcon selected={selected}>
          {icon}
        </ServiceIcon>
        
        <ServiceDetails>
          <ServicePrice>${service.precio}</ServicePrice>
          <ServiceDuration>{service.duracion}</ServiceDuration>
        </ServiceDetails>
      </CardHeader>
      
      <ServiceTitle>{service.nombre}</ServiceTitle>
      
      {showDescription && service.descripcion && (
        <ServiceDescription>
          {service.descripcion}
        </ServiceDescription>
      )}
    </CardContainer>
  );
};

export default ServiceCard;