import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${theme.spacing.xxxl} 0 ${theme.spacing.xl} 0;
  padding: 0 ${theme.spacing.lg};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${theme.sizes.mobile}) {
    margin: ${theme.spacing.xxl} 0 ${theme.spacing.lg} 0;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  
  &:not(:last-child) {
    margin-right: ${theme.spacing.lg};
  }
`;

const StepIndicator = styled.div`
  width: 32px;
  height: 2px;
  background: ${props => {
    if (props.active) return theme.colors.accent;
    if (props.completed) return theme.colors.accent;
    return theme.colors.border;
  }};
  border-radius: ${theme.borderRadius.full};
  transition: ${theme.transitions.normal};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: ${props => {
      if (props.active) return theme.colors.accent;
      if (props.completed) return theme.colors.accent;
      return theme.colors.border;
    }};
    border-radius: 50%;
    transition: ${theme.transitions.normal};
  }
`;

const StepLabel = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${theme.spacing.sm};
  font-size: 0.75rem;
  font-weight: ${props => props.active ? '600' : '500'};
  color: ${props => {
    if (props.active) return theme.colors.accent;
    if (props.completed) return theme.colors.accent;
    return theme.colors.textLight;
  }};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  transition: ${theme.transitions.fast};
  
  @media (max-width: ${theme.sizes.mobile}) {
    display: none;
  }
`;

const StepConnector = styled.div`
  flex: 1;
  height: 1px;
  background: ${props => props.completed ? theme.colors.accent : theme.colors.border};
  transition: ${theme.transitions.normal};
  margin: 0 ${theme.spacing.md};
`;

const MinimalProgressBar = ({ steps, currentStep }) => {
  return (
    <ProgressContainer>
      {steps.map((step, index) => (
        <React.Fragment key={step.id || index}>
          <StepWrapper>
            <StepIndicator
              active={currentStep === index + 1}
              completed={currentStep > index + 1}
            />
            <StepLabel
              active={currentStep === index + 1}
              completed={currentStep > index + 1}
            >
              {step.label}
            </StepLabel>
          </StepWrapper>
          
          {index < steps.length - 1 && (
            <StepConnector completed={currentStep > index + 1} />
          )}
        </React.Fragment>
      ))}
    </ProgressContainer>
  );
};

export default MinimalProgressBar;