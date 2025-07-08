import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    // Base neutra minimalista
    primary: '#ffffff',        // Blanco puro
    secondary: '#f8f9fa',      // Gris muy claro
    surface: '#ffffff',        // Superficie blanca
    background: '#fafafa',     // Fondo principal
    
    // Textos
    text: '#1a1a1a',          // Negro suave
    textMuted: '#6b7280',     // Gris medio
    textLight: '#9ca3af',     // Gris claro
    
    // Color de acento sofisticado
    accent: '#1a2a3a',        // Azul medianoche profundo
    accentHover: '#0f1419',   // Azul medianoche más oscuro
    accentLight: '#2d3748',   // Azul medianoche claro
    
    // Bordes y divisores
    border: '#e5e7eb',        // Gris muy claro
    borderHover: '#d1d5db',   // Gris claro hover
    
    // Estados
    success: '#10b981',       // Verde éxito
    error: '#ef4444',         // Rojo error
    warning: '#f59e0b',       // Amarillo warning
    
    // Sombras
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowHover: 'rgba(0, 0, 0, 0.15)',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    secondary: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  sizes: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  spacing: {
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    xxl: '3rem',       // 48px
    xxxl: '4rem',      // 64px
    xxxxl: '5rem',     // 80px
  },
  borderRadius: {
    none: '0',
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    accent: '0 0 0 3px rgba(26, 42, 58, 0.1)',
    accentHover: '0 0 0 3px rgba(26, 42, 58, 0.2)',
    focus: '0 0 0 3px rgba(26, 42, 58, 0.15)',
  },
  transitions: {
    fast: 'all 0.15s ease-in-out',
    normal: 'all 0.3s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.fonts.secondary};
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.7;
    overflow: hidden; /* Eliminar scroll */
    height: 100vh;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Scrollbar personalizada minimalista */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.borderHover};
  }

  /* Selección de texto */
  ::selection {
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
  }

  /* Focus personalizado */
  *:focus {
    outline: none;
    box-shadow: ${theme.shadows.focus};
  }

  *:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in {
    animation: slideIn 0.5s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive Typography - Minimalista */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.primary};
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.text};
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: ${theme.spacing.xl};
  }

  h2 {
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 700;
    margin-bottom: ${theme.spacing.xl};
  }

  h3 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing.lg};
  }

  h4 {
    font-size: clamp(1.25rem, 2.5vw, 1.875rem);
    font-weight: 600;
    margin-bottom: ${theme.spacing.md};
  }

  h5 {
    font-size: clamp(1.125rem, 2vw, 1.5rem);
    font-weight: 500;
    margin-bottom: ${theme.spacing.md};
  }

  h6 {
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    font-weight: 500;
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.textMuted};
    font-size: 1.125rem;
    line-height: 1.8;
  }

  /* Utility Classes - Minimalista */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.lg};
  }

  .container-sm {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.lg};
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .text-accent {
    color: ${theme.colors.accent};
  }

  .text-muted {
    color: ${theme.colors.textMuted};
  }

  .text-light {
    color: ${theme.colors.textLight};
  }

  .bg-surface {
    background-color: ${theme.colors.surface};
  }

  .bg-secondary {
    background-color: ${theme.colors.secondary};
  }

  .full-height {
    height: 100vh;
  }

  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .grid-center {
    display: grid;
    place-items: center;
  }

  .space-y-sm > * + * {
    margin-top: ${theme.spacing.sm};
  }

  .space-y-md > * + * {
    margin-top: ${theme.spacing.md};
  }

  .space-y-lg > * + * {
    margin-top: ${theme.spacing.lg};
  }

  .space-y-xl > * + * {
    margin-top: ${theme.spacing.xl};
  }

  /* Media Queries */
  @media (max-width: ${theme.sizes.mobile}) {
    .container {
      padding: 0 ${theme.spacing.sm};
    }
    
    body {
      font-size: 14px;
    }
  }

  @media (min-width: ${theme.sizes.desktop}) {
    .full-height {
      height: 100vh;
      overflow: hidden;
    }
  }
`;

// Componentes reutilizables estilizados - Minimalista
export const Button = styled.button`
  font-family: ${theme.fonts.primary};
  font-weight: 500;
  font-size: ${props => props.size === 'large' ? '1.125rem' : '1rem'};
  padding: ${props => props.size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
  border: 1px solid transparent;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: ${theme.transitions.normal};
  letter-spacing: -0.01em;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  text-decoration: none;
  white-space: nowrap;

  ${props => props.variant === 'primary' && `
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.accentHover};
      box-shadow: ${theme.shadows.md};
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.border};
    
    &:hover {
      border-color: ${theme.colors.accent};
      box-shadow: ${theme.shadows.accent};
    }
  `}

  ${props => props.variant === 'ghost' && `
    background: transparent;
    color: ${theme.colors.textMuted};
    border: none;
    
    &:hover {
      color: ${theme.colors.accent};
      background: ${theme.colors.secondary};
    }
  `}

  ${props => props.variant === 'minimal' && `
    background: transparent;
    color: ${theme.colors.accent};
    border: none;
    padding: ${theme.spacing.sm};
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    
    &:hover {
      text-decoration-thickness: 2px;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }

  &:focus {
    box-shadow: ${theme.shadows.focus};
  }
`;

export const Card = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  transition: ${theme.transitions.normal};
  border: 1px solid ${theme.colors.border};

  &:hover {
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.borderHover};
  }

  ${props => props.selectable && `
    cursor: pointer;
    
    &:hover {
      border-color: ${theme.colors.accent};
      box-shadow: ${theme.shadows.accent};
    }
  `}

  ${props => props.selected && `
    border-color: ${theme.colors.accent};
    box-shadow: ${theme.shadows.accent};
    background: ${theme.colors.secondary};
  `}

  ${props => props.variant === 'minimal' && `
    background: transparent;
    border: none;
    box-shadow: none;
    padding: ${theme.spacing.md};
    
    &:hover {
      background: ${theme.colors.secondary};
      box-shadow: none;
    }
  `}
`;

export const Input = styled.input`
  font-family: ${theme.fonts.secondary};
  font-size: 1rem;
  padding: 0.875rem 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  transition: ${theme.transitions.fast};
  width: 100%;
  line-height: 1.5;

  &:focus {
    border-color: ${theme.colors.accent};
    outline: none;
    box-shadow: ${theme.shadows.focus};
  }

  &:hover {
    border-color: ${theme.colors.borderHover};
  }

  &::placeholder {
    color: ${theme.colors.textLight};
  }

  &:disabled {
    background: ${theme.colors.secondary};
    color: ${theme.colors.textLight};
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  font-family: ${theme.fonts.primary};
  font-weight: 500;
  font-size: 0.875rem;
  color: ${theme.colors.text};
  letter-spacing: -0.01em;
  margin-bottom: ${theme.spacing.sm};
  display: block;
`;

export const LoadingSpinner = styled.div`
  width: ${props => props.size || '32px'};
  height: ${props => props.size || '32px'};
  border: 2px solid ${theme.colors.border};
  border-top: 2px solid ${theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: ${theme.spacing.lg} auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  background: ${theme.colors.error};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  font-weight: 500;
  text-align: center;
  font-size: 0.875rem;
`;

export const SuccessMessage = styled.div`
  background: ${theme.colors.success};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.lg} 0;
  font-weight: 500;
  text-align: center;
  font-size: 0.875rem;
`;

// Componente no tradicional: Barra de progreso minimalista
export const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin: ${theme.spacing.xl} 0;
  padding: 0 ${theme.spacing.sm};
`;

export const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: 0.875rem;
  color: ${props => props.active ? theme.colors.accent : theme.colors.textLight};
  font-weight: ${props => props.active ? '500' : '400'};
  transition: ${theme.transitions.fast};
  position: relative;

  &::before {
    content: '';
    width: 8px;
    height: 2px;
    background: ${props => props.active ? theme.colors.accent : theme.colors.border};
    border-radius: ${theme.borderRadius.full};
    transition: ${theme.transitions.fast};
  }
`;

export const ProgressConnector = styled.div`
  flex: 1;
  height: 1px;
  background: ${props => props.completed ? theme.colors.accent : theme.colors.border};
  transition: ${theme.transitions.normal};
`;

// Componente no tradicional: Botón flotante minimalista
export const FloatingButton = styled.button`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  width: 56px;
  height: 56px;
  border-radius: ${theme.borderRadius.full};
  border: none;
  background: ${theme.colors.accent};
  color: ${theme.colors.primary};
  box-shadow: ${theme.shadows.lg};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${theme.shadows.xl};
  }

  &:active {
    transform: scale(0.95);
  }
`;