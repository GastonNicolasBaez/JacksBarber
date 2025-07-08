import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { apiService, mockData, useMockData } from '../services/api';
import { FaArrowLeft, FaCut, FaUser, FaEnvelope } from 'react-icons/fa';

// Importar componentes minimalistas
import MinimalProgressBar from './MinimalProgressBar';
import ServiceCard from './ServiceCard';
import MinimalDateTimeSelector from './MinimalDateTimeSelector';
import MinimalButton from './MinimalButton';
import ContactForm from './ContactForm';

const BookingContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${theme.colors.background};
  overflow-y: auto;
  overflow-x: hidden;
`;

const BookingContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xxxl} ${theme.spacing.lg};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxl};

  @media (max-width: ${theme.sizes.mobile}) {
    padding: ${theme.spacing.xxl} ${theme.spacing.md};
    gap: ${theme.spacing.xxl};
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const MainTitle = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.md};
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const MainSubtitle = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: clamp(0.875rem, 2vw, 1rem);
  color: ${theme.colors.textMuted};
  margin: 0;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  position: fixed;
  top: ${theme.spacing.xl};
  left: ${theme.spacing.xl};
  width: 48px;
  height: 48px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  z-index: 100;
  
  &:hover {
    border-color: ${theme.colors.accent};
    color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
  }
  
  svg {
    font-size: 1rem;
  }
  
  @media (max-width: ${theme.sizes.mobile}) {
    top: ${theme.spacing.lg};
    left: ${theme.spacing.lg};
    width: 40px;
    height: 40px;
    
    svg {
      font-size: 0.875rem;
    }
  }
`;

const StepContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  flex-shrink: 0;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  
  @media (max-width: ${theme.sizes.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
`;

const StepSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const ContinueButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.xl};
  
  @media (max-width: ${theme.sizes.mobile}) {
    margin-top: ${theme.spacing.lg};
  }
`;

// Definir los pasos del proceso
const PASOS = {
  SERVICIO: 1,
  PELUQUERO: 2,
  FECHA_HORA: 3,
  CONTACTO: 4
};

const BookingSection = ({ onBackToHero }) => {
  // Estados del componente
  const [pasoActual, setPasoActual] = useState(PASOS.SERVICIO);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [peluqueroSeleccionado, setPeluqueroSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [datosContacto, setDatosContacto] = useState({
    nombre: '',
    telefono: '',
    email: ''
  });
  
  // Estados de datos
  const [servicios, setServicios] = useState([]);
  const [peluqueros, setPeluqueros] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  
  // Estados de carga
  const [loadingServicios, setLoadingServicios] = useState(false);
  const [loadingPeluqueros, setLoadingPeluqueros] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  
  // Estados de error
  const [errorServicios, setErrorServicios] = useState(null);
  const [errorPeluqueros, setErrorPeluqueros] = useState(null);
  const [errorHorarios, setErrorHorarios] = useState(null);

  // Definir pasos para la barra de progreso
  const progressSteps = [
    { id: 1, label: 'Servicio' },
    { id: 2, label: 'Barbero' },
    { id: 3, label: 'Fecha/Hora' },
    { id: 4, label: 'Contacto' }
  ];

  // Cargar servicios al montar el componente
  useEffect(() => {
    cargarServicios();
  }, []);

  // Cargar peluqueros cuando se selecciona un servicio
  useEffect(() => {
    if (servicioSeleccionado) {
      cargarPeluqueros();
    }
  }, [servicioSeleccionado]);

  // Cargar horarios cuando se tienen todos los datos necesarios
  const cargarHorarios = useCallback(async () => {
    if (useMockData) {
      setHorariosDisponibles(mockData.disponibilidad.disponibilidad);
      return;
    }

    setLoadingHorarios(true);
    setErrorHorarios(null);
    
    try {
      const fechaFormateada = apiService.formatearFecha(fechaSeleccionada);
      const data = await apiService.getDisponibilidad(
        fechaFormateada,
        servicioSeleccionado.id,
        peluqueroSeleccionado?.id
      );
      setHorariosDisponibles(data.disponibilidad || []);
    } catch (error) {
      setErrorHorarios(error.message);
      console.error('Error cargando horarios:', error);
    } finally {
      setLoadingHorarios(false);
    }
  }, [fechaSeleccionada, servicioSeleccionado, peluqueroSeleccionado]);

  useEffect(() => {
    if (servicioSeleccionado && fechaSeleccionada) {
      cargarHorarios();
    }
  }, [servicioSeleccionado, peluqueroSeleccionado, fechaSeleccionada, cargarHorarios]);

  // Funciones para cargar datos
  const cargarServicios = async () => {
    if (useMockData) {
      setServicios(mockData.servicios);
      return;
    }

    setLoadingServicios(true);
    setErrorServicios(null);
    
    try {
      const data = await apiService.getServicios();
      setServicios(data);
    } catch (error) {
      setErrorServicios(error.message);
      console.error('Error cargando servicios:', error);
    } finally {
      setLoadingServicios(false);
    }
  };

  const cargarPeluqueros = async () => {
    if (useMockData) {
      setPeluqueros(mockData.peluqueros);
      return;
    }

    setLoadingPeluqueros(true);
    setErrorPeluqueros(null);
    
    try {
      const data = await apiService.getPeluqueros();
      setPeluqueros(data);
    } catch (error) {
      setErrorPeluqueros(error.message);
      console.error('Error cargando peluqueros:', error);
    } finally {
      setLoadingPeluqueros(false);
    }
  };

  // Event handlers
  const handleServicioSelect = (servicio) => {
    setServicioSeleccionado(servicio);
    setPeluqueroSeleccionado(null);
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setHorariosDisponibles([]);
    setPasoActual(PASOS.PELUQUERO);
  };

  const handlePeluqueroSelect = (peluquero) => {
    setPeluqueroSeleccionado(peluquero);
    setFechaSeleccionada(null);
    setHoraSeleccionada(null);
    setHorariosDisponibles([]);
    setPasoActual(PASOS.FECHA_HORA);
  };

  const handleFechaSelect = (fecha) => {
    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
  };

  const handleHoraSelect = (hora) => {
    setHoraSeleccionada(hora);
  };

  const handleSiguientePaso = () => {
    if (pasoActual < PASOS.CONTACTO) {
      setPasoActual(pasoActual + 1);
    }
  };

  const handlePasoAnterior = () => {
    if (pasoActual > PASOS.SERVICIO) {
      setPasoActual(pasoActual - 1);
    } else if (pasoActual === PASOS.SERVICIO && onBackToHero) {
      onBackToHero();
    }
  };

  // Generar fechas disponibles (próximos 14 días sin domingos)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    while (dates.length < 14) {
      if (currentDate.getDay() !== 0) { // Excluir domingos
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  // Procesar horarios disponibles
  const getAvailableTimeSlots = () => {
    const horariosAgrupados = horariosDisponibles.reduce((acc, item) => {
      if (!acc[item.peluquero_nombre]) {
        acc[item.peluquero_nombre] = [];
      }
      acc[item.peluquero_nombre].push(...item.horarios_disponibles);
      return acc;
    }, {});

    return peluqueroSeleccionado && peluqueroSeleccionado.id 
      ? horariosDisponibles.find(item => item.peluquero_id === peluqueroSeleccionado.id)?.horarios_disponibles || []
      : Object.values(horariosAgrupados).flat().filter((hora, index, array) => array.indexOf(hora) === index);
  };

  // Renderizar cada paso
  const renderStepContent = () => {
    switch (pasoActual) {
      case PASOS.SERVICIO:
        return (
          <StepSection>
            <HeaderSection>
              <h2>Selecciona un servicio</h2>
              <p>Elige el servicio que deseas reservar</p>
            </HeaderSection>
            
            <ServicesGrid>
              {servicios.map((servicio) => (
                <ServiceCard
                  key={servicio.id}
                  service={servicio}
                  selected={servicioSeleccionado?.id === servicio.id}
                  onClick={handleServicioSelect}
                  icon={<FaCut />}
                />
              ))}
            </ServicesGrid>
            
            {loadingServicios && <div>Cargando servicios...</div>}
            {errorServicios && <div>Error: {errorServicios}</div>}
          </StepSection>
        );

      case PASOS.PELUQUERO:
        return (
          <StepSection>
            <HeaderSection>
              <h2>Selecciona un barbero</h2>
              <p>Elige el profesional que prefieras o selecciona "Cualquiera"</p>
            </HeaderSection>
            
            <ServicesGrid>
              {peluqueros.map((peluquero) => (
                <ServiceCard
                  key={peluquero.id}
                  service={peluquero}
                  selected={peluqueroSeleccionado?.id === peluquero.id}
                  onClick={handlePeluqueroSelect}
                  icon={<FaUser />}
                />
              ))}
            </ServicesGrid>
            
            {loadingPeluqueros && <div>Cargando peluqueros...</div>}
            {errorPeluqueros && <div>Error: {errorPeluqueros}</div>}
          </StepSection>
        );

      case PASOS.FECHA_HORA:
        return (
          <StepSection>
            <HeaderSection>
              <h2>Selecciona fecha y hora</h2>
              <p>Elige el día y horario que mejor se adapte a tu agenda</p>
            </HeaderSection>
            
            <MinimalDateTimeSelector
              availableDates={generateAvailableDates()}
              selectedDate={fechaSeleccionada}
              onDateSelect={handleFechaSelect}
              availableSlots={getAvailableTimeSlots()}
              selectedSlot={horaSeleccionada}
              onSlotSelect={handleHoraSelect}
              loading={loadingHorarios}
              error={errorHorarios}
            />
            
            {fechaSeleccionada && horaSeleccionada && (
              <ContinueButtonContainer>
                <MinimalButton
                  variant="primary"
                  size="large"
                  onClick={handleSiguientePaso}
                  icon={<FaEnvelope />}
                >
                  Continuar
                </MinimalButton>
              </ContinueButtonContainer>
            )}
          </StepSection>
        );

      case PASOS.CONTACTO:
        return (
          <ContactForm
            datosContacto={datosContacto}
            onDatosChange={setDatosContacto}
            onSubmit={() => {}}
          />
        );

      default:
        return null;
    }
  };

  // Renderizar el componente
  return (
    <BookingContainer>
      {/* Botón de retroceso */}
      {(pasoActual > PASOS.SERVICIO || (pasoActual === PASOS.SERVICIO && onBackToHero)) && (
        <BackButton onClick={handlePasoAnterior}>
          <FaArrowLeft />
        </BackButton>
      )}

      <BookingContent>
        {/* Título principal */}
        <HeaderSection>
          <MainTitle>Reserva tu Turno</MainTitle>
          <MainSubtitle>
            Proceso rápido y sencillo para reservar tu cita en Jack's Barber
          </MainSubtitle>
        </HeaderSection>

        {/* Barra de progreso minimalista */}
        <MinimalProgressBar 
          steps={progressSteps} 
          currentStep={pasoActual} 
        />

        {/* Contenido del paso actual */}
        <StepContent>
          {renderStepContent()}
        </StepContent>
      </BookingContent>
    </BookingContainer>
  );
};

export default BookingSection;
