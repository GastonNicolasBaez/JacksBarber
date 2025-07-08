# Jack's Barber - Frontend

Frontend moderno y responsive para el sistema de reserva de turnos de la barbería Jack's Barber, desarrollado con React.

## 🎨 Características de Diseño

- **Tema Oscuro Premium**: Paleta de colores basada en el logo (negro profundo/azul marino + dorado)
- **Diseño Mobile-First**: Totalmente responsive con enfoque móvil primero
- **Vista Desktop Full-Screen**: Sin scroll vertical en escritorio (100vh)
- **Animaciones Suaves**: Transiciones y efectos visuales elegantes
- **Tipografía Premium**: Combinación de Oswald y Open Sans

## 🚀 Tecnologías Utilizadas

- **React 18**: Biblioteca principal
- **Styled Components**: CSS-in-JS para estilos encapsulados
- **React Router**: Navegación (preparado para futuras expansiones)
- **Axios**: Cliente HTTP para APIs
- **React Icons**: Iconografía vectorial
- **React DatePicker**: Selector de fechas
- **Framer Motion**: Animaciones avanzadas (preparado)

## 📱 Funcionalidades

### Flujo de Reserva Multi-Step
1. **Selección de Servicio**: Tarjetas visuales con iconos personalizados
2. **Selección de Barbero**: Opción "Cualquier barbero" + barberos específicos
3. **Fecha y Hora**: Calendario custom + slots de horarios dinámicos
4. **Datos de Contacto**: Formulario con validación + resumen de reserva

### Características Técnicas
- **Gestión de Estado Avanzada**: Estados de carga, errores y éxito
- **Validación Completa**: Frontend y backend
- **Modo Mock**: Desarrollo sin backend
- **Responsive Design**: Breakpoints móvil, tablet, desktop
- **Accesibilidad**: Focus, contraste, navegación por teclado

## 🛠️ Instalación y Configuración

### Requisitos
- Node.js 16+
- npm o yarn

### Pasos de Instalación

1. **Instalar dependencias**:
```bash
cd jacks-barber-frontend
npm install
```

2. **Configurar variables de entorno**:
```bash
cp .env.example .env
```

Editar `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_USE_MOCK=false  # true para desarrollo sin backend
```

3. **Ejecutar en desarrollo**:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start

# Build para producción
npm run build

# Tests
npm test

# Análisis de bundle
npm run build && npx serve -s build
```

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Header.js        # Cabecera con logo
│   ├── Footer.js        # Pie de página minimalista
│   ├── BookingSection.js # Sección principal de reservas
│   ├── ServiceSelection.js # Selección de servicios
│   ├── BarberSelection.js  # Selección de barberos
│   ├── DateTimeSelection.js # Calendario y horarios
│   └── ContactForm.js   # Formulario de contacto
├── pages/               # Páginas de la aplicación
│   └── HomePage.js      # Página principal
├── services/            # Servicios y APIs
│   └── api.js          # Cliente API + datos mock
├── styles/              # Estilos globales y tema
│   └── GlobalStyles.js  # Tema, estilos globales, componentes base
├── utils/               # Utilidades (futuro)
├── assets/              # Recursos estáticos (futuro)
├── App.js              # Componente principal
└── index.js            # Punto de entrada
```

## 🎨 Sistema de Diseño

### Paleta de Colores
```javascript
const theme = {
  colors: {
    primary: '#0a0a0a',        // Negro profundo
    secondary: '#1a1a2e',      // Azul marino profundo
    accent: '#ffd700',         // Dorado brillante
    accentHover: '#ffed4a',    // Dorado hover
    text: '#ffffff',           // Blanco
    textMuted: '#a0a0a0',      // Gris claro
    surface: '#2a2a2a',        // Superficie oscura
    // ... más colores
  }
}
```

### Breakpoints Responsive
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Componentes Base Reutilizables
- `Button`: Variantes primary, secondary, ghost
- `Card`: Tarjetas con hover y selección
- `Input` / `Label`: Campos de formulario estilizados
- `LoadingSpinner`: Indicador de carga
- `ErrorMessage` / `SuccessMessage`: Mensajes de estado

## 🔌 Integración con Backend

### Endpoints Consumidos
```javascript
// Servicios
GET /api/servicios/

// Peluqueros
GET /api/peluqueros/

// Disponibilidad
GET /api/turnos/disponibilidad/?fecha=YYYY-MM-DD&servicio_id=ID&peluquero_id=ID

// Crear turno
POST /api/turnos/
```

### Manejo de Errores
- Interceptores Axios para errores HTTP
- Estados de error específicos por componente
- Mensajes de error user-friendly
- Fallback a datos mock en desarrollo

## 🎯 Características Avanzadas

### Validación de Datos
- Validación en tiempo real
- Formateo automático de teléfonos
- Verificación de fechas pasadas
- Validación de disponibilidad

### UX Optimizations
- Loading states con skeletons
- Animaciones de transición entre pasos
- Feedback visual inmediato
- Navegación intuitiva

### Accesibilidad
- Contraste WCAG AA
- Navegación por teclado
- Focus management
- Screen reader friendly

## 🚀 Producción

### Build Optimizado
```bash
npm run build
```

### Variables de Entorno para Producción
```env
REACT_APP_API_URL=https://tu-api-production.com
REACT_APP_USE_MOCK=false
```

### Deployment
- Compatible con Netlify, Vercel, S3
- Build estático optimizado
- Service Worker ready (PWA)

## 🔮 Futuras Mejoras

- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Multi-idioma (i18n)
- [ ] Dashboard de admin
- [ ] Sistema de cuentas de usuario
- [ ] Integración con calendario Google
- [ ] Pagos online
- [ ] Chat en vivo

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"
1. Verificar que el backend esté corriendo en `http://localhost:8000`
2. Revisar configuración de CORS en el backend
3. Activar modo mock: `REACT_APP_USE_MOCK=true`

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problemas de Estilos
- Verificar que styled-components esté instalado
- Comprobar imports de GlobalStyles
- Revisar compatibilidad del navegador

## 📄 Licencia

MIT License