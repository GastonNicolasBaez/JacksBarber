import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/GlobalStyles';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%);
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} 0;
  flex-shrink: 0;
  position: relative;

  @media (max-width: ${theme.sizes.mobile}) {
    padding: ${theme.spacing.xs} 0;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.sizes.mobile}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.sizes.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: ${theme.spacing.sm};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.sizes.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};

  svg {
    color: ${theme.colors.accent};
    flex-shrink: 0;
    font-size: 0.875rem;
  }
`;

const DeveloperInfo = styled.div`
  font-size: 0.75rem;
  color: ${theme.colors.textDark};
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.accentHover};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.border};
  font-size: 0.65rem;
  color: ${theme.colors.textDark};
`;

const BrandName = styled.span`
  color: ${theme.colors.accent};
  font-weight: 600;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterInfo>
          <ContactInfo>
            <ContactItem>
              <FaMapMarkerAlt />
              <span>Av. Corrientes 1234, CABA</span>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <span>+54 11 1234-5678</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <span>info@jacksbarber.com</span>
            </ContactItem>
          </ContactInfo>
          
          <DeveloperInfo>
            Desarrollado por <a href="mailto:nicolas@developer.com">Nicolás García</a>
          </DeveloperInfo>
        </FooterInfo>

        <Copyright>
          © {currentYear} <BrandName>Jack's Barber</BrandName>. Todos los derechos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;