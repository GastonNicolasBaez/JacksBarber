import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { Button, Input, Label, ErrorMessage, SuccessMessage } from '../styles/GlobalStyles';
import { FaUser, FaPhone, FaEdit } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 600px;
  margin: ${theme.spacing.sm} auto 0;
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  height: fit-content;
  max-height: 80vh;
  overflow-y: auto;
`;

const SectionTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 600;
  color: ${theme.colors.accent};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.sm};
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  color: ${theme.colors.accent};
  z-index: 1;
  pointer-events: none;
`;

const StyledInput = styled(Input)`
  padding-left: 3rem;
  
  &:focus + ${InputIcon} {
    color: ${theme.colors.accentHover};
  }
`;

const StyledTextarea = styled.textarea`
  font-family: ${theme.fonts.secondary};
  font-size: 1rem;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};
  width: 100%;
  min-height: 100px;
  resize: vertical;

  &:focus {
    border-color: ${theme.colors.accent};
    outline: none;
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ErrorText = styled.span`
  color: ${theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${theme.spacing.xs};
  display: block;
`;

const FormSummary = styled.div`
  background: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  border: 1px solid ${theme.colors.border};
`;

const SummaryTitle = styled.h3`
  font-family: ${theme.fonts.primary};
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryLabel = styled.span`
  color: ${theme.colors.textMuted};
  font-size: 0.875rem;
`;

const SummaryValue = styled.span`
  color: ${theme.colors.text};
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.sizes.mobile}) {
    flex-direction: column;
  }
`;

const ContactForm = ({ 
  datosContacto,
  onDatosChange,
  onSubmit,
  loading = false,
  error = null,
  success = false,
  resumenReserva = null,
  onVolver = null
}) => {
  const [erroresValidacion, setErroresValidacion] = useState({});

  const handleInputChange = (field, value) => {
    onDatosChange({ ...datosContacto, [field]: value });
    
    // Limpiar error de validación cuando el usuario corrige
    if (erroresValidacion[field]) {
      setErroresValidacion(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validarFormulario = () => {
    const errores = {};

    if (!datosContacto.nombre_cliente || datosContacto.nombre_cliente.trim().length < 2) {
      errores.nombre_cliente = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!datosContacto.telefono_cliente || datosContacto.telefono_cliente.trim().length < 8) {
      errores.telefono_cliente = 'El teléfono debe tener al menos 8 dígitos';
    }

    // Validar formato de teléfono
    const telefonoRegex = /^[\d\s\-()]+$/;
    if (datosContacto.telefono_cliente && !telefonoRegex.test(datosContacto.telefono_cliente)) {
      errores.telefono_cliente = 'El teléfono contiene caracteres inválidos';
    }

    setErroresValidacion(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit();
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const opciones = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  if (success) {
    return (
      <div className="fade-in">
        <FormContainer>
          <SectionTitle>¡Reserva Confirmada!</SectionTitle>
          
          <SuccessMessage>
            Tu turno ha sido reservado exitosamente. Recibirás una confirmación por teléfono.
          </SuccessMessage>

          {resumenReserva && (
            <FormSummary>
              <SummaryTitle>Detalles de tu Reserva</SummaryTitle>
              
              <SummaryItem>
                <SummaryLabel>Servicio:</SummaryLabel>
                <SummaryValue>{resumenReserva.servicio}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Barbero:</SummaryLabel>
                <SummaryValue>{resumenReserva.peluquero || 'Cualquier barbero disponible'}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Fecha:</SummaryLabel>
                <SummaryValue>{formatearFecha(resumenReserva.fecha)}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Hora:</SummaryLabel>
                <SummaryValue>{resumenReserva.hora}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Cliente:</SummaryLabel>
                <SummaryValue>{resumenReserva.cliente}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Teléfono:</SummaryLabel>
                <SummaryValue>{resumenReserva.telefono}</SummaryValue>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryLabel>Precio:</SummaryLabel>
                <SummaryValue>${resumenReserva.precio}</SummaryValue>
              </SummaryItem>
            </FormSummary>
          )}

          <ButtonContainer>
            <Button 
              variant="primary" 
              size="large"
              onClick={() => window.location.reload()}
              style={{ flex: 1 }}
            >
              Nueva Reserva
            </Button>
          </ButtonContainer>
        </FormContainer>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <FormContainer>
        <SectionTitle>Datos de Contacto</SectionTitle>
        
        {resumenReserva && (
          <FormSummary>
            <SummaryTitle>Resumen de tu Reserva</SummaryTitle>
            
            <SummaryItem>
              <SummaryLabel>Servicio:</SummaryLabel>
              <SummaryValue>{resumenReserva.servicio}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Barbero:</SummaryLabel>
              <SummaryValue>{resumenReserva.peluquero || 'Cualquier barbero disponible'}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Fecha:</SummaryLabel>
              <SummaryValue>{formatearFecha(resumenReserva.fecha)}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Hora:</SummaryLabel>
              <SummaryValue>{resumenReserva.hora}</SummaryValue>
            </SummaryItem>
            
            <SummaryItem>
              <SummaryLabel>Precio:</SummaryLabel>
              <SummaryValue>${resumenReserva.precio}</SummaryValue>
            </SummaryItem>
          </FormSummary>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nombre">Nombre Completo *</Label>
            <InputWrapper>
              <StyledInput
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre completo"
                value={datosContacto.nombre_cliente || ''}
                onChange={(e) => handleInputChange('nombre_cliente', e.target.value)}
                disabled={loading}
              />
              <InputIcon>
                <FaUser />
              </InputIcon>
            </InputWrapper>
            {erroresValidacion.nombre_cliente && (
              <ErrorText>{erroresValidacion.nombre_cliente}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="telefono">Número de Teléfono *</Label>
            <InputWrapper>
              <StyledInput
                id="telefono"
                type="tel"
                placeholder="Ej: +54 11 1234-5678"
                value={datosContacto.telefono_cliente || ''}
                onChange={(e) => handleInputChange('telefono_cliente', e.target.value)}
                disabled={loading}
              />
              <InputIcon>
                <FaPhone />
              </InputIcon>
            </InputWrapper>
            {erroresValidacion.telefono_cliente && (
              <ErrorText>{erroresValidacion.telefono_cliente}</ErrorText>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="notas">Comentarios (Opcional)</Label>
            <InputWrapper>
              <StyledTextarea
                id="notas"
                placeholder="¿Algún comentario especial sobre tu corte o preferencias?"
                value={datosContacto.notas || ''}
                onChange={(e) => handleInputChange('notas', e.target.value)}
                disabled={loading}
              />
              <InputIcon>
                <FaEdit />
              </InputIcon>
            </InputWrapper>
          </FormGroup>

          <ButtonContainer>
            {onVolver && (
              <Button 
                type="button"
                variant="ghost" 
                size="large"
                onClick={onVolver}
                disabled={loading}
                style={{ flex: 1 }}
              >
                Volver
              </Button>
            )}
            
            <Button 
              type="submit"
              variant="primary" 
              size="large"
              disabled={loading || !datosContacto.nombre_cliente || !datosContacto.telefono_cliente}
              style={{ flex: 2 }}
            >
              {loading ? 'Confirmando...' : 'Confirmar Reserva'}
            </Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </div>
  );
};

export default ContactForm;