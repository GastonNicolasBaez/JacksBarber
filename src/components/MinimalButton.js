import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';

const ButtonContainer = styled.button`
  font-family: ${theme.fonts.primary};
  font-weight: 500;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '0.875rem';
      case 'large': return '1.125rem';
      default: return '1rem';
    }
  }};
  padding: ${props => {
    switch (props.size) {
      case 'small': return '0.5rem 1rem';
      case 'large': return '1rem 2rem';
      default: return '0.75rem 1.5rem';
    }
  }};
  border: none;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: -0.01em;
  outline: none;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  &:focus {
    box-shadow: ${theme.shadows.focus};
  }
  
  /* Variant: Primary */
  ${props => props.variant === 'primary' && `
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${theme.colors.accentHover};
      box-shadow: ${theme.shadows.md};
    }
    
    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `}
  
  /* Variant: Secondary */
  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.border};
    
    &:hover:not(:disabled) {
      border-color: ${theme.colors.accent};
      background: ${theme.colors.secondary};
      box-shadow: ${theme.shadows.accent};
    }
  `}
  
  /* Variant: Ghost */
  ${props => props.variant === 'ghost' && `
    background: transparent;
    color: ${theme.colors.textMuted};
    border: none;
    
    &:hover:not(:disabled) {
      color: ${theme.colors.accent};
      background: ${theme.colors.secondary};
    }
  `}
  
  /* Variant: Minimal (underline style) */
  ${props => props.variant === 'minimal' && `
    background: transparent;
    color: ${theme.colors.accent};
    border: none;
    padding: ${theme.spacing.sm};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    
    &:hover:not(:disabled) {
      text-decoration-thickness: 2px;
    }
  `}
  
  /* Variant: Floating (for floating action buttons) */
  ${props => props.variant === 'floating' && `
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
    box-shadow: ${theme.shadows.lg};
    width: 56px;
    height: 56px;
    padding: 0;
    
    &:hover:not(:disabled) {
      background: ${theme.colors.accentHover};
      box-shadow: ${theme.shadows.xl};
      transform: scale(1.05);
    }
    
    &:active:not(:disabled) {
      transform: scale(0.95);
    }
  `}
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.iconSize || '1em'};
  
  ${props => props.position === 'right' && `
    order: 1;
  `}
`;

const MinimalButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon,
  iconPosition = 'left',
  iconSize,
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props 
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={className}
      {...props}
    >
      {icon && (
        <ButtonIcon 
          position={iconPosition}
          iconSize={iconSize}
        >
          {icon}
        </ButtonIcon>
      )}
      {children}
    </ButtonContainer>
  );
};

export default MinimalButton;