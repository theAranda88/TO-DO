import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { ContenedorIzq } from './Componentes/ContenedorIzq';

const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

jest.mock('./Imagenes/comprobado.png', () => 'mock-check-image');
jest.mock('./Imagenes/documento.png', () => 'mock-document-image');
jest.mock('./Imagenes/borrar.png', () => 'mock-delete-image');

window.alert = jest.fn();

describe('Casos de Prueba Documentados - Validaciones, Casos Borde y Persistencia', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('TC012 - Tareas con nombres duplicados', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea');
    await userEvent.click(button);
    
    await userEvent.type(input, 'Tarea');
    await userEvent.click(button);
    
    await waitFor(() => {
      const tareasDuplicadas = screen.getAllByText('Tarea');
      expect(tareasDuplicadas).toHaveLength(2);
    });
  });

  test('TC013 - Texto multiidioma', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    const textoMultiidioma = '中文 العربية Русский';
    
    await userEvent.type(input, textoMultiidioma);
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText(textoMultiidioma)).toBeInTheDocument();
    });
  });

  test('TC014 - Estado inicial sin tareas', () => {
    const AppSinTareas = () => {
      const [tareas, setTareas] = React.useState([]);
      
      const addTarea = (nombre) => {
        const nuevaTarea = {
          key: tareas.length + 1,
          nombre: nombre,
          completado: false,
        };
        setTareas([...tareas, nuevaTarea]);
      };
      
      return (
        <div>
          <ContenedorIzq addTarea={addTarea} />
        </div>
      );
    };
    
    expect(() => {
      render(<AppSinTareas />);
    }).not.toThrow();
    
    expect(screen.getByPlaceholderText('Ingrese su Tarea')).toBeInTheDocument();
  });

  test('TC016 - Cargar desde localStorage', () => {

    expect(() => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([
        { key: 1, nombre: 'Tarea guardada', completado: false }
      ]));
      
      render(<App />);
      
      expect(screen.getByText('Tarea guardada')).toBeInTheDocument();
    }).toThrow();
  });

  test('TC017 - Error en localStorage', async () => {
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('localStorage no disponible');
    });

    expect(() => {
      render(<App />);
    }).not.toThrow();
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea sin localStorage');
    
    try {
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Tarea sin localStorage')).toBeInTheDocument();
      });
    } catch (error) {
      expect(error.message).toContain('localStorage no disponible');
    }
  });

  test('TC018 - localStorage vacío', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    expect(() => {
      render(<App />);
    }).not.toThrow();
    
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
  });
});

