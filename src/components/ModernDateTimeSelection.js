import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { LoadingSpinner, ErrorMessage } from '../styles/GlobalStyles';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const DateTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
  height: auto;
  min-height: 600px;
  max-height: none;
  overflow: visible;

  @media (max-width: ${theme.sizes.mobile}) {
    gap: ${theme.spacing.sm};
    min-height: 500px;
  }
`;

const SelectionSection = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: visible;
  min-height: 300px;
  
  @media (max-width: ${theme.sizes.mobile}) {
    min-height: 250px;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.md};
  flex-shrink: 0;
`;

const SubSectionTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;

  svg {
    color: ${theme.colors.accent};
    font-size: 0.875rem;
  }
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  max-height: 200px;
  overflow-y: auto;
  padding-right: ${theme.spacing.xs};

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.accent};
    border-radius: ${theme.borderRadius.sm};
  }
`;

const DateCard = styled.button`
  background: ${props => props.selected ? 
    `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)` :
    theme.colors.primary
  };
  color: ${props => props.selected ? theme.colors.primary : theme.colors.text};
  border: 1px solid ${props => props.selected ? theme.colors.accent : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${theme.transitions.fast};
  font-family: ${theme.fonts.secondary};
  text-align: center;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.accent};
    background: ${props => props.selected ? 
      `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)` :
      `${theme.colors.accent}20`
    };
  }

  ${props => props.selected && `
    box-shadow: ${theme.shadows.gold};
  `}
`;

const DateCardDay = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.selected ? theme.colors.primary : theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DateCardNumber = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 2px 0;
`;

const DateCardMonth = styled.div`
  font-size: 0.625rem;
  font-weight: 500;
  color: ${props => props.selected ? theme.colors.primary : theme.colors.textMuted};
  text-transform: uppercase;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: ${theme.spacing.sm};
  max-height: 300px;
  min-height: 200px;
  overflow-y: auto;
  padding-right: ${theme.spacing.xs};
  flex: 1;

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.accent};
    border-radius: ${theme.borderRadius.sm};
  }
  
  @media (max-width: ${theme.sizes.mobile}) {
    max-height: 250px;
    min-height: 150px;
  }
`;

const TimeSlot = styled.button`
  background: ${props => props.selected ? 
    `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)` :
    theme.colors.primary
  };
  color: ${props => props.selected ? theme.colors.primary : theme.colors.text};
  border: 1px solid ${props => props.selected ? theme.colors.accent : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: ${theme.fonts.secondary};
  font-weight: 600;
  font-size: 0.875rem;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${theme.colors.accent};
    background: ${props => props.selected ? 
      `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)` :
      `${theme.colors.accent}20`
    };
  }

  ${props => props.selected && `
    box-shadow: ${theme.shadows.gold};
  `}
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: ${theme.colors.textMuted};
  font-style: italic;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  flex: 1;
  justify-content: center;
`;

const monthNames = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const ModernDateTimeSelection = ({ 
  fechaSeleccionada,
  horaSeleccionada,
  onFechaSelect,
  onHoraSelect,
  horariosDisponibles = [],
  loadingHorarios = false,
  errorHorarios = null,
  servicio = null,
  peluquero = null
}) => {
  // Generar las próximas 14 fechas disponibles (excluyendo domingos)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < 14) {
      // Excluir domingos (día 0)
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleDateSelect = (date) => {
    onFechaSelect(date);
    // Limpiar hora seleccionada cuando cambia la fecha
    onHoraSelect(null);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateSelected = (date) => {
    if (!fechaSeleccionada || !date) return false;
    return formatDate(date) === formatDate(fechaSeleccionada);
  };

  // Agrupar horarios por peluquero
  const horariosAgrupados = horariosDisponibles.reduce((acc, item) => {
    if (!acc[item.peluquero_nombre]) {
      acc[item.peluquero_nombre] = [];
    }
    acc[item.peluquero_nombre].push(...item.horarios_disponibles);
    return acc;
  }, {});

  // Si hay un peluquero específico seleccionado, mostrar solo sus horarios
  const horariosAMostrar = peluquero && peluquero.id 
    ? horariosDisponibles.find(item => item.peluquero_id === peluquero.id)?.horarios_disponibles || []
    : Object.values(horariosAgrupados).flat().filter((hora, index, array) => array.indexOf(hora) === index);

  return (
    <div className="fade-in">
      <SectionTitle>Selecciona Fecha y Hora</SectionTitle>
      
      <DateTimeContainer>
        <SelectionSection>
          <SubSectionTitle>
            <FaCalendarAlt />
            Selecciona una fecha
          </SubSectionTitle>
          
          <DateGrid>
            {availableDates.map((date, index) => (
              <DateCard
                key={index}
                selected={isDateSelected(date)}
                onClick={() => handleDateSelect(date)}
              >
                <DateCardDay selected={isDateSelected(date)}>
                  {dayNames[date.getDay()]}
                </DateCardDay>
                <DateCardNumber>
                  {date.getDate()}
                </DateCardNumber>
                <DateCardMonth selected={isDateSelected(date)}>
                  {monthNames[date.getMonth()]}
                </DateCardMonth>
              </DateCard>
            ))}
          </DateGrid>
        </SelectionSection>

        <SelectionSection>
          <SubSectionTitle>
            <FaClock />
            Selecciona un horario
          </SubSectionTitle>
          
          {!fechaSeleccionada ? (
            <EmptyMessage>
              Primero selecciona una fecha
            </EmptyMessage>
          ) : loadingHorarios ? (
            <LoadingContainer>
              <LoadingSpinner size="40px" />
              <span style={{ color: theme.colors.textMuted }}>
                Cargando horarios disponibles...
              </span>
            </LoadingContainer>
          ) : errorHorarios ? (
            <ErrorMessage>
              {errorHorarios}
            </ErrorMessage>
          ) : horariosAMostrar.length === 0 ? (
            <EmptyMessage>
              No hay horarios disponibles para esta fecha
            </EmptyMessage>
          ) : (
            <TimeGrid>
              {horariosAMostrar.sort().map((hora) => (
                <TimeSlot
                  key={hora}
                  selected={horaSeleccionada === hora}
                  onClick={() => onHoraSelect(hora)}
                >
                  {hora}
                </TimeSlot>
              ))}
            </TimeGrid>
          )}
        </SelectionSection>
      </DateTimeContainer>
    </div>
  );
};

export default ModernDateTimeSelection;