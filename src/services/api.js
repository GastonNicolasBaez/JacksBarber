import axios from 'axios';
import { useState } from 'react';

// Configuración base de axios
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // El servidor respondió con un código de error
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          throw new Error(data.detail || 'Datos inválidos. Por favor verifica la información ingresada.');
        case 404:
          throw new Error('Recurso no encontrado.');
        case 500:
          throw new Error('Error interno del servidor. Por favor intenta más tarde.');
        default:
          throw new Error(data.detail || 'Ocurrió un error inesperado.');
      }
    } else if (error.request) {
      // No se recibió respuesta del servidor
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
    } else {
      // Error en la configuración de la petición
      throw new Error('Error en la configuración de la petición.');
    }
  }
);

// Servicios de la API
export const apiService = {
  // Obtener servicios
  getServicios: async () => {
    try {
      const response = await api.get('/api/servicios/');
      return response.data.results || response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener peluqueros
  getPeluqueros: async () => {
    try {
      const response = await api.get('/api/peluqueros/');
      return response.data.results || response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener disponibilidad
  getDisponibilidad: async (fecha, servicioId, peluqueroId = null) => {
    try {
      const params = {
        fecha,
        servicio_id: servicioId,
      };
      
      if (peluqueroId) {
        params.peluquero_id = peluqueroId;
      }

      const response = await api.get('/api/turnos/disponibilidad/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear turno
  crearTurno: async (turnoData) => {
    try {
      const response = await api.post('/api/turnos/', turnoData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Funciones de validación
  validarFecha: (fecha) => {
    const today = new Date();
    const selectedDate = new Date(fecha);
    
    // Resetear horas para comparar solo fechas
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    return selectedDate >= today;
  },

  // Formatear fecha para la API
  formatearFecha: (fecha) => {
    if (fecha instanceof Date) {
      return fecha.toISOString().split('T')[0];
    }
    return fecha;
  },

  // Formatear hora para mostrar
  formatearHora: (hora) => {
    if (typeof hora === 'string') {
      return hora.substring(0, 5); // HH:MM
    }
    return hora;
  },

  // Validar datos del formulario de contacto
  validarContacto: (datos) => {
    const errores = {};

    if (!datos.nombre_cliente || datos.nombre_cliente.trim().length < 2) {
      errores.nombre_cliente = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!datos.telefono_cliente || datos.telefono_cliente.trim().length < 8) {
      errores.telefono_cliente = 'El teléfono debe tener al menos 8 dígitos';
    }

    // Validar formato de teléfono (números, espacios, guiones, paréntesis)
    const telefonoRegex = /^[\d\s\-()]+$/;
    if (datos.telefono_cliente && !telefonoRegex.test(datos.telefono_cliente)) {
      errores.telefono_cliente = 'El teléfono contiene caracteres inválidos';
    }

    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  },
};

// Hook personalizado para manejar el estado de carga
export const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeCall = async (apiFunction, ...args) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { loading, error, executeCall, setError };
};

// Datos mock para desarrollo (cuando el backend no esté disponible)
export const mockData = {
  servicios: [
    {
      id: 1,
      nombre: 'Corte de Cabello',
      duracion_minutos: 30,
      precio: '1500.00',
      descripcion: 'Corte de cabello tradicional con máquina y tijera'
    },
    {
      id: 2,
      nombre: 'Barba',
      duracion_minutos: 20,
      precio: '800.00',
      descripcion: 'Arreglo y diseño de barba'
    },
    {
      id: 3,
      nombre: 'Corte + Barba',
      duracion_minutos: 45,
      precio: '2000.00',
      descripcion: 'Servicio completo de corte de cabello y barba'
    },
    {
      id: 4,
      nombre: 'Afeitado Clásico',
      duracion_minutos: 25,
      precio: '1200.00',
      descripcion: 'Afeitado tradicional con navaja y toallas calientes'
    }
  ],
  
  peluqueros: [
    {
      id: 1,
      nombre_completo: 'Jack Rodriguez',
      descripcion: 'Barbero profesional con 15 años de experiencia',
      activo: true
    },
    {
      id: 2,
      nombre_completo: 'María García',
      descripcion: 'Especialista en cortes modernos y clásicos',
      activo: true
    },
    {
      id: 3,
      nombre_completo: 'Carlos López',
      descripcion: 'Experto en afeitado tradicional y cuidado de barba',
      activo: true
    }
  ],

  disponibilidad: {
    fecha: '2024-01-15',
    servicio: {
      id: 1,
      nombre: 'Corte de Cabello',
      duracion_minutos: 30,
      precio: '1500.00'
    },
    disponibilidad: [
      {
        peluquero_id: 1,
        peluquero_nombre: 'Jack Rodriguez',
        horarios_disponibles: ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']
      },
      {
        peluquero_id: 2,
        peluquero_nombre: 'María García',
        horarios_disponibles: ['09:15', '09:45', '10:15', '10:45', '11:15', '14:15', '14:45', '15:15', '15:45', '16:15']
      }
    ]
  }
};

// Función para usar datos mock en desarrollo
export const useMockData = process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true';

export default api;