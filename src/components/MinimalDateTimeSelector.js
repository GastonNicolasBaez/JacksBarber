import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxl};
  padding: ${theme.spacing.xl} 0;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
  text-align: center;
  letter-spacing: -0.01em;
`;

const SectionSubtitle = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
  text-align: center;
  margin: 0;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '120px'}, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const SelectableItem = styled.button`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  text-align: center;
  position: relative;
  
  &:hover {
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${props => props.selected && `
    border-color: ${theme.colors.accent};
    background: ${theme.colors.secondary};
    box-shadow: ${theme.shadows.accent};
  `}
`;

const DateCard = styled(SelectableItem)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  min-height: 80px;
  justify-content: center;
`;

const DateDay = styled.div`
  font-family: ${theme.fonts.secondary};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DateNumber = styled.div`
  font-family: ${theme.fonts.primary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
  line-height: 1;
`;

const DateMonth = styled.div`
  font-family: ${theme.fonts.secondary};
  font-size: 0.625rem;
  font-weight: 500;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TimeSlot = styled(SelectableItem)`
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.text};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xxl};
  color: ${theme.colors.textMuted};
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
`;

const MinimalDateTimeSelector = ({
  availableDates = [],
  selectedDate,
  onDateSelect,
  availableSlots = [],
  selectedSlot,
  onSlotSelect,
  loading = false,
  error = null
}) => {
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const formatDate = (date) => {
    return {
      day: dayNames[date.getDay()],
      number: date.getDate(),
      month: monthNames[date.getMonth()]
    };
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <SelectorContainer>
      {/* Selector de Fecha */}
      <SectionContainer>
        <SectionTitle>Selecciona una fecha</SectionTitle>
        <SectionSubtitle>
          Elige el día que mejor se adapte a tu agenda
        </SectionSubtitle>
        
        <Grid minWidth="100px">
          {availableDates.map((date, index) => {
            const formattedDate = formatDate(date);
            const selected = isDateSelected(date);
            
            return (
              <DateCard
                key={index}
                selected={selected}
                onClick={() => onDateSelect(date)}
              >
                <DateDay>{formattedDate.day}</DateDay>
                <DateNumber>{formattedDate.number}</DateNumber>
                <DateMonth>{formattedDate.month}</DateMonth>
              </DateCard>
            );
          })}
        </Grid>
        
        {availableDates.length === 0 && (
          <EmptyState>
            No hay fechas disponibles
          </EmptyState>
        )}
      </SectionContainer>

      {/* Selector de Hora */}
      <SectionContainer>
        <SectionTitle>Selecciona un horario</SectionTitle>
        <SectionSubtitle>
          {selectedDate ? 
            'Horarios disponibles para el día seleccionado' : 
            'Primero selecciona una fecha'
          }
        </SectionSubtitle>
        
        {selectedDate && (
          <Grid minWidth="80px">
            {availableSlots.map((slot, index) => (
              <TimeSlot
                key={index}
                selected={selectedSlot === slot}
                onClick={() => onSlotSelect(slot)}
              >
                {slot}
              </TimeSlot>
            ))}
          </Grid>
        )}
        
        {selectedDate && availableSlots.length === 0 && !loading && (
          <EmptyState>
            No hay horarios disponibles para esta fecha
          </EmptyState>
        )}
        
        {loading && (
          <EmptyState>
            Cargando horarios disponibles...
          </EmptyState>
        )}
        
        {error && (
          <EmptyState style={{ color: theme.colors.error }}>
            {error}
          </EmptyState>
        )}
      </SectionContainer>
    </SelectorContainer>
  );
};

export default MinimalDateTimeSelector;