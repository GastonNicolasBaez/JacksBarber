import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { Button, Input, Label, ErrorMessage, SuccessMessage } from '../styles/GlobalStyles';
import { FaUser, FaPhone, FaEdit, FaCheck, FaCalendarAlt, FaClock } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1rem, 3vw, 1.25rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  flex: 1;
  overflow: hidden;
  max-height: 400px;

  @media (max-width: ${theme.sizes.mobile}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.sm};
    max-height: 500px;
  }
`;

const SummarySection = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const FormSection = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SubSectionTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xs};
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border};

  svg {
    color: ${theme.colors.accent};
    font-size: 0.875rem;
    flex-shrink: 0;
  }
`;

const SummaryLabel = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 60px;
`;

const SummaryValue = styled.span`
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.text};
  flex: 1;
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
  flex-shrink: 0;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: ${theme.colors.accent};
  z-index: 1;
  pointer-events: none;
  font-size: 0.875rem;
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
  font-size: 0.875rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  
  &:focus + ${InputIcon} {
    color: ${theme.colors.accentHover};
  }
`;

const StyledTextarea = styled.textarea`
  font-family: ${theme.fonts.secondary};
  font-size: 0.875rem;
  padding: 0.625rem 0.75rem;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};
  width: 100%;
  resize: vertical;
  min-height: 60px;
  max-height: 80px;

  &:focus {
    border-color: ${theme.colors.accent};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const StyledLabel = styled(Label)`
  font-size: 0.75rem;
  margin-bottom: ${theme.spacing.xs};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
  flex-shrink: 0;

  @media (max-width: ${theme.sizes.mobile}) {
    flex-direction: column;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid ${theme.colors.success};
  margin: 0 auto;
  max-width: 500px;
`;

const SuccessIcon = styled.div`
  font-size: 3rem;
  color: ${theme.colors.success};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.success};
  margin-bottom: ${theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SuccessMessage = styled.p`
  font-family: ${theme.fonts.secondary};
  color: ${theme.colors.textMuted};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.5;
`;

const CompactContactForm = ({ 
  datosContacto, 
  onDatosChange, 
  onSubmit, 
  loading, 
  error, 
  success, 
  resumenReserva,
  onVolver
}) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    onDatosChange({
      ...datosContacto,
      [field]: value
    });
    
    // Limpiar error específico cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!datosContacto.nombre_cliente || datosContacto.nombre_cliente.trim().length < 2) {
      newErrors.nombre_cliente = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!datosContacto.telefono_cliente || datosContacto.telefono_cliente.trim().length < 8) {
      newErrors.telefono_cliente = 'El teléfono debe tener al menos 8 dígitos';
    }
    
    const telefonoRegex = /^[\d\s\-()]+$/;
    if (datosContacto.telefono_cliente && !telefonoRegex.test(datosContacto.telefono_cliente)) {
      newErrors.telefono_cliente = 'El teléfono contiene caracteres inválidos';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit();
    }
  };

  if (success) {
    return (
      <SuccessContainer className="fade-in">
        <SuccessIcon>
          <FaCheck />
        </SuccessIcon>
        <SuccessTitle>¡Reserva Confirmada!</SuccessTitle>
        <SuccessMessage>
          Tu turno ha sido reservado exitosamente. Te esperamos en Jack's Barber.
        </SuccessMessage>
        <Button 
          variant="primary" 
          size="large"
          onClick={() => window.location.reload()}
        >
          Nueva Reserva
        </Button>
      </SuccessContainer>
    );
  }

  return (
    <FormContainer className="fade-in">
      <SectionTitle>Confirmar Reserva</SectionTitle>
      
      <ContentContainer>
        {/* Resumen de la reserva */}
        <SummarySection>
          <SubSectionTitle>Resumen de tu turno</SubSectionTitle>
          
          {resumenReserva && (
            <>
              <SummaryItem>
                <FaEdit />
                <SummaryLabel>Servicio:</SummaryLabel>
                <SummaryValue>{resumenReserva.servicio}</SummaryValue>
              </SummaryItem>
              
              {resumenReserva.peluquero && (
                <SummaryItem>
                  <FaUser />
                  <SummaryLabel>Barbero:</SummaryLabel>
                  <SummaryValue>{resumenReserva.peluquero}</SummaryValue>
                </SummaryItem>
              )}
              
              <SummaryItem>
                <FaCalendarAlt />
                <SummaryLabel>Fecha:</SummaryLabel>
                <SummaryValue>
                  {new Date(resumenReserva.fecha).toLocaleDateString('es-AR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <FaClock />
                <SummaryLabel>Hora:</SummaryLabel>
                <SummaryValue>{resumenReserva.hora}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <div style={{ color: theme.colors.accent }}>$</div>
                <SummaryLabel>Precio:</SummaryLabel>
                <SummaryValue>${resumenReserva.precio}</SummaryValue>
              </SummaryItem>
            </>
          )}
        </SummarySection>

        {/* Formulario de contacto */}
        <FormSection>
          <SubSectionTitle>Tus datos</SubSectionTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <StyledLabel htmlFor="nombre">Nombre completo</StyledLabel>
              <InputWrapper>
                <StyledInput
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre completo"
                  value={datosContacto.nombre_cliente}
                  onChange={(e) => handleInputChange('nombre_cliente', e.target.value)}
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {errors.nombre_cliente && (
                <ErrorMessage style={{ margin: '4px 0', padding: '4px 8px', fontSize: '0.75rem' }}>
                  {errors.nombre_cliente}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="telefono">Teléfono</StyledLabel>
              <InputWrapper>
                <StyledInput
                  id="telefono"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={datosContacto.telefono_cliente}
                  onChange={(e) => handleInputChange('telefono_cliente', e.target.value)}
                />
                <InputIcon>
                  <FaPhone />
                </InputIcon>
              </InputWrapper>
              {errors.telefono_cliente && (
                <ErrorMessage style={{ margin: '4px 0', padding: '4px 8px', fontSize: '0.75rem' }}>
                  {errors.telefono_cliente}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <StyledLabel htmlFor="notas">Notas adicionales (opcional)</StyledLabel>
              <StyledTextarea
                id="notas"
                placeholder="Alguna preferencia especial o comentario..."
                value={datosContacto.notas}
                onChange={(e) => handleInputChange('notas', e.target.value)}
              />
            </FormGroup>

            {error && (
              <ErrorMessage style={{ margin: '8px 0', padding: '8px', fontSize: '0.875rem' }}>
                {error}
              </ErrorMessage>
            )}

            <ButtonContainer>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onVolver}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Volver
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
                style={{ flex: 2 }}
              >
                {loading ? 'Confirmando...' : 'Confirmar Reserva'}
              </Button>
            </ButtonContainer>
          </form>
        </FormSection>
      </ContentContainer>
    </FormContainer>
  );
};

export default CompactContactForm;