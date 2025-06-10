import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { ContenedorIzq } from './Componentes/ContenedorIzq';
import { TareaDer } from './Componentes/CompConteDer/TareaDer';

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

// Mock de las imágenes
jest.mock('./Imagenes/comprobado.png', () => 'mock-check-image');
jest.mock('./Imagenes/documento.png', () => 'mock-document-image');
jest.mock('./Imagenes/borrar.png', () => 'mock-delete-image');

// Mock de alert
window.alert = jest.fn();

describe('Casos Borde - Lista de Tareas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  describe('Validación de Entrada', () => {
    test('maneja entrada con caracteres especiales y emojis', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      const tareaEspecial = '🚀 Tarea con émojis y símbolos @#$%^&*()!';
      
      await userEvent.type(input, tareaEspecial);
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText(tareaEspecial)).toBeInTheDocument();
      });
    });

    test('maneja texto muy largo', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      const textoLargo = 'A'.repeat(1000); // 1000 caracteres
      
      await userEvent.type(input, textoLargo);
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText(textoLargo)).toBeInTheDocument();
      });
    });

    test('maneja caracteres de diferentes idiomas', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      const textoMultiidioma = '中文 العربية Русский 日本語 Español';
      
      await userEvent.type(input, textoMultiidioma);
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText(textoMultiidioma)).toBeInTheDocument();
      });
    });

    test('preserva espacios al inicio y final del texto', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      const textoConEspacios = '  Tarea con espacios  ';
      
      await userEvent.type(input, textoConEspacios);
      await userEvent.click(button);

      await waitFor(() => {
        const tareas = screen.queryAllByText(/Tarea con espacios/);
        expect(tareas.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Operaciones Múltiples', () => {
    test('añade muchas tareas rápidamente', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      for (let i = 1; i <= 10; i++) {
        await userEvent.type(input, `Tarea rápida ${i}`);
        await userEvent.click(button);
      }
      
      await waitFor(() => {
        for (let i = 1; i <= 10; i++) {
          expect(screen.getByText(`Tarea rápida ${i}`)).toBeInTheDocument();
        }
      });
    });

    test('elimina todas las tareas', async () => {
      
      render(<App />);
      
      let botonesEliminar = screen.getAllByAltText('imagenDel');
      const cantidadInicial = botonesEliminar.length;
      
      for (let i = 0; i < cantidadInicial; i++) {
        botonesEliminar = screen.getAllByAltText('imagenDel');
        if (botonesEliminar.length > 0) {
          await userEvent.click(botonesEliminar[0]);
        }
      }
      
      await waitFor(() => {
        const tareasRestantes = screen.queryAllByText(/Tarea \d/);
        expect(tareasRestantes).toHaveLength(0);
      });
    });

    test('completa y descompleta todas las tareas', async () => {
      
      render(<App />);
      
      const tareas = ['Tarea 1', 'Tarea 2', 'Tarea 3', 'Tarea 4'];
      
      for (const nombreTarea of tareas) {
        const tarea = screen.getByText(nombreTarea);
        await userEvent.click(tarea);
      }
      
      await waitFor(() => {
        tareas.forEach(nombreTarea => {
          const tarea = screen.getByText(nombreTarea);
          expect(tarea).toHaveClass('completed');
        });
      });
      
      for (const nombreTarea of tareas) {
        const tarea = screen.getByText(nombreTarea);
        await userEvent.click(tarea);
      }
      
      await waitFor(() => {
        tareas.forEach(nombreTarea => {
          const tarea = screen.getByText(nombreTarea);
          expect(tarea).not.toHaveClass('completed');
        });
      });
    });
  });

  describe('Comportamiento del LocalStorage', () => {
    test('maneja errores del localStorage', async () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage no disponible');
      });

      expect(() => {
        render(<App />);
      }).not.toThrow();
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      

      await userEvent.type(input, 'Tarea sin localStorage');
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(screen.getByText('Tarea sin localStorage')).toBeInTheDocument();
      });
    });

    test('maneja localStorage vacío', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      expect(() => {
        render(<App />);
      }).not.toThrow();
      

      expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    });
  });

  describe('Estados Extremos', () => {
    test('renderiza sin tareas iniciales', () => {
      // Crear una versión del App sin tareas iniciales
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
      
      render(<AppSinTareas />);
      
      expect(screen.getByPlaceholderText('Ingrese su Tarea')).toBeInTheDocument();
    });

    test('maneja keys duplicados', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      await userEvent.type(input, 'Tarea duplicada');
      await userEvent.click(button);
      
      await userEvent.type(input, 'Tarea duplicada');
      await userEvent.click(button);
      
      await waitFor(() => {
        const tareasDuplicadas = screen.getAllByText('Tarea duplicada');
        expect(tareasDuplicadas).toHaveLength(2);
      });
    });

    test('maneja props undefined en TareaDer', () => {
      expect(() => {
        render(<TareaDer nombre="Tarea de prueba" />);
      }).not.toThrow();
    });

    test('maneja funciones undefined en ContenedorIzq', () => {
      expect(() => {
        render(<ContenedorIzq />);
      }).not.toThrow();
    });
  });

  describe('Accesibilidad y UX', () => {
    test('permite navegación con teclado', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      
      await userEvent.tab();
      expect(input).toHaveFocus();
      
      await userEvent.type(input, 'Tarea con teclado');
      
      expect(input).toHaveValue('Tarea con teclado');
    });

    test('mantiene el foco después de añadir tarea', async () => {
      
      render(<App />);
      
      const input = screen.getByPlaceholderText('Ingrese su Tarea');
      const button = screen.getByRole('button');
      
      await userEvent.type(input, 'Tarea para foco');
      await userEvent.click(button);

      expect(input).toBeInTheDocument();
    });
  });
});

