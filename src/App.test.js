import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

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

describe('Casos de Prueba Documentados - Gestión de Tareas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('TC001 - Crear tarea válida', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Estudiar React');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Estudiar React')).toBeInTheDocument();
    });
  });

  test('TC006 - Completar tarea', async () => {
    render(<App />);
    
    const tarea1 = screen.getByText('Tarea 1');
    await userEvent.click(tarea1);
    
    await waitFor(() => {
      expect(tarea1).toHaveClass('completed');
    });
  });

  test('TC007 - Descompletar tarea', async () => {
    render(<App />);
    
    const tarea1 = screen.getByText('Tarea 1');
    
    await userEvent.click(tarea1);
    await waitFor(() => {
      expect(tarea1).toHaveClass('completed');
    });
    
    await userEvent.click(tarea1);
    await waitFor(() => {
      expect(tarea1).not.toHaveClass('completed');
    });
  });

  test('TC008 - Eliminar tarea existente', async () => {
    render(<App />);
    
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    
    const botonesEliminar = screen.getAllByAltText('imagenDel');
    await userEvent.click(botonesEliminar[0]);
    
    expect(window.alert).toHaveBeenCalledWith('Esta seguro de eliminar esta tarea?');
    
    await waitFor(() => {
      expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
    });
  });

  test('TC009 - Eliminar múltiples tareas', async () => {
    render(<App />);
    
    const botonesEliminar = screen.getAllByAltText('imagenDel');
    
    await userEvent.click(botonesEliminar[0]); // Eliminar Tarea 1
    await userEvent.click(botonesEliminar[1]); // Eliminar Tarea 2
    await userEvent.click(botonesEliminar[2]); // Eliminar Tarea 3
    
    await waitFor(() => {
      expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Tarea 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Tarea 3')).not.toBeInTheDocument();
    });
  });

  test('TC010 - Actualizar contenido de tarea', async () => {
    render(<App />);
    
    const botonesActualizar = screen.getAllByAltText('imagenAct');
    await userEvent.click(botonesActualizar[0]);
    
    expect(screen.getByText('ACTUALIZAR TAREA')).toBeInTheDocument();
    
    const inputModal = screen.getByPlaceholderText('Ingrese nueva tarea');
    await userEvent.clear(inputModal);
    await userEvent.type(inputModal, 'Repasar React');
    
    const botonGuardar = screen.getByText('Actualizar Tarea');
    await userEvent.click(botonGuardar);
    
    expect(window.alert).toHaveBeenCalledWith('Esta seguro de actualizar esta tarea?');
    
    await waitFor(() => {
      expect(screen.getByText('Repasar React')).toBeInTheDocument();
      expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
    });
  });

  test('TC011 - Múltiples tareas rápidas', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    for (let i = 1; i <= 10; i++) {
      await userEvent.type(input, `Tarea ${i}`);
      await userEvent.click(button);
    }
    
    await waitFor(() => {
      for (let i = 1; i <= 10; i++) {
        expect(screen.getByText(`Tarea ${i}`)).toBeInTheDocument();
      }
    });
  });

  test('TC015 - Guardar en localStorage', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea para localStorage');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Almacenando datos');
    });
  });
});
