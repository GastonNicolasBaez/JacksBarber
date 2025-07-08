import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { LoadingSpinner, ErrorMessage } from '../styles/GlobalStyles';
import { FaCalendarAlt, FaClock, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.xs};
  flex-shrink: 0;
`;

const SubSectionTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;

  svg {
    color: ${theme.colors.accent};
    font-size: 0.75rem;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs};
  padding: ${theme.spacing.xs} 0;
  border-bottom: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`;

const MonthYear = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.border};
  color: ${theme.colors.text};
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    font-size: 0.625rem;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  flex: 1;
  overflow: hidden;
`;

const DayHeader = styled.div`
  font-family: ${theme.fonts.primary};
  font-size: 0.5rem;
  font-weight: 600;
  color: ${theme.colors.textMuted};
  text-align: center;
  padding: 2px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DayButton = styled.button`
  aspect-ratio: 1;
  border: 1px solid ${theme.colors.border};
  background: ${props => {
    if (props.selected) return `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)`;
    if (props.isToday) return theme.colors.surface;
    if (props.disabled) return theme.colors.primary;
    return theme.colors.surface;
  }};
  color: ${props => {
    if (props.selected) return theme.colors.primary;
    if (props.disabled) return theme.colors.textDark;
    if (props.isToday) return theme.colors.accent;
    return theme.colors.text;
  }};
  border-radius: ${theme.borderRadius.sm};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: ${theme.transitions.fast};
  font-family: ${theme.fonts.secondary};
  font-weight: ${props => props.isToday ? '600' : '400'};
  font-size: 0.625rem;
  min-height: 20px;
  max-height: 24px;

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

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: ${theme.spacing.xs};
  flex: 1;
  overflow-y: auto;
  padding-right: ${theme.spacing.xs};
  max-height: 300px;
  min-height: 200px;

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
  padding: 4px 6px;
  border: 1px solid ${theme.colors.border};
  background: ${props => props.selected ? 
    `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentHover} 100%)` :
    theme.colors.primary
  };
  color: ${props => props.selected ? theme.colors.primary : theme.colors.text};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: ${theme.fonts.secondary};
  font-weight: 500;
  font-size: 0.625rem;
  min-height: 24px;
  max-height: 28px;

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
  grid-column: 1 / -1;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
`;

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

const DateTimeSelection = ({ 
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
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Generar días del calendario
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Días vacíos del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const isWeekend = date.getDay() === 0; // Domingo cerrado
      
      days.push({
        day,
        date,
        isToday,
        disabled: isPast || isWeekend
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

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
            Fecha
          </SubSectionTitle>
          
          <CalendarHeader>
            <NavButton 
              onClick={handlePrevMonth}
              disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth()}
            >
              <FaChevronLeft />
            </NavButton>
            
            <MonthYear>
              {monthNames[currentMonth]} {currentYear}
            </MonthYear>
            
            <NavButton onClick={handleNextMonth}>
              <FaChevronRight />
            </NavButton>
          </CalendarHeader>
          
          <CalendarGrid>
            {dayNames.map(day => (
              <DayHeader key={day}>{day}</DayHeader>
            ))}
            
            {calendarDays.map((day, index) => (
              <DayButton
                key={index}
                disabled={!day || day.disabled}
                isToday={day?.isToday}
                selected={day && isDateSelected(day.date)}
                onClick={() => day && !day.disabled && handleDateSelect(day.date)}
              >
                {day?.day}
              </DayButton>
            ))}
          </CalendarGrid>
        </SelectionSection>

        <SelectionSection>
          <SubSectionTitle>
            <FaClock />
            Hora
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
            <TimeSlotsGrid>
              {horariosAMostrar.sort().map((hora) => (
                <TimeSlot
                  key={hora}
                  selected={horaSeleccionada === hora}
                  onClick={() => onHoraSelect(hora)}
                >
                  {hora}
                </TimeSlot>
              ))}
            </TimeSlotsGrid>
          )}
        </SelectionSection>
      </DateTimeContainer>
    </div>
  );
};

export default DateTimeSelection;