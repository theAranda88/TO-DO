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

describe('App - Integración Completa de Lista de Tareas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renderiza la aplicación correctamente con tareas iniciales', () => {
    render(<App />);
    
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText('Tarea 3')).toBeInTheDocument();
    expect(screen.getByText('Tarea 4')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Ingrese su Tarea')).toBeInTheDocument();
  });

  test('añade una nueva tarea correctamente', async () => {
    
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Nueva tarea de prueba');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Nueva tarea de prueba')).toBeInTheDocument();
    });
    
    expect(input).toHaveValue('');
  });

  test('marca una tarea como completada', async () => {
    
    render(<App />);
    
    const tarea1 = screen.getByText('Tarea 1');
    await userEvent.click(tarea1);
    
    await waitFor(() => {
      expect(tarea1).toHaveClass('completed');
    });
  });

  test('desmarca una tarea completada', async () => {
    
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

  test('elimina una tarea correctamente', async () => {
    
    render(<App />);
    
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    
    const botonesEliminar = screen.getAllByAltText('imagenDel');
    await userEvent.click(botonesEliminar[0]);
    
    expect(window.alert).toHaveBeenCalledWith('Esta seguro de eliminar esta tarea?');
    
    await waitFor(() => {
      expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
    });
  });

  test('no añade tarea con nombre vacío', async () => {
    
    render(<App />);
    
    const button = screen.getByRole('button');
    const tareasIniciales = screen.getAllByText(/Tarea \d/);
    const cantidadInicial = tareasIniciales.length;
    
    await userEvent.click(button);
    
    const tareasFinales = screen.getAllByText(/Tarea \d/);
    expect(tareasFinales).toHaveLength(cantidadInicial);
  });

  test('no añade tarea con solo espacios en blanco', async () => {
    
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    const tareasIniciales = screen.getAllByText(/Tarea \d/);
    const cantidadInicial = tareasIniciales.length;
    
    await userEvent.type(input, '   ');
    await userEvent.click(button);
    
    const tareasFinales = screen.getAllByText(/Tarea \d/);
    expect(tareasFinales).toHaveLength(cantidadInicial);
  });

  test('genera keys únicos para nuevas tareas', async () => {
    
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Primera nueva tarea');
    await userEvent.click(button);
    
    await userEvent.type(input, 'Segunda nueva tarea');
    await userEvent.click(button);
    
    await userEvent.type(input, 'Tercera nueva tarea');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Primera nueva tarea')).toBeInTheDocument();
      expect(screen.getByText('Segunda nueva tarea')).toBeInTheDocument();
      expect(screen.getByText('Tercera nueva tarea')).toBeInTheDocument();
    });
  });

  test('mantiene el estado de completado independiente para cada tarea', async () => {
    
    render(<App />);
    
    const tarea1 = screen.getByText('Tarea 1');
    const tarea2 = screen.getByText('Tarea 2');
    
    await userEvent.click(tarea1);
    
    await waitFor(() => {
      expect(tarea1).toHaveClass('completed');
      expect(tarea2).not.toHaveClass('completed');
    });
  });

  test('permite eliminar múltiples tareas', async () => {
    
    render(<App />);
    
    const botonesEliminar = screen.getAllByAltText('imagenDel');
    
    await userEvent.click(botonesEliminar[0]); // Eliminar Tarea 1
    await userEvent.click(botonesEliminar[1]); // Eliminar Tarea 2
    
    await waitFor(() => {
      expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Tarea 2')).not.toBeInTheDocument();
      expect(screen.getByText('Tarea 3')).toBeInTheDocument();
      expect(screen.getByText('Tarea 4')).toBeInTheDocument();
    });
  });

  test('maneja flujo completo: añadir, completar, eliminar', async () => {
    
    render(<App />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea de flujo completo');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Tarea de flujo completo')).toBeInTheDocument();
    });
    
    const nuevaTarea = screen.getByText('Tarea de flujo completo');
    await userEvent.click(nuevaTarea);
    
    await waitFor(() => {
      expect(nuevaTarea).toHaveClass('completed');
    });
    
    const botonesEliminar = screen.getAllByAltText('imagenDel');
    const botonEliminarNuevaTarea = botonesEliminar.find(boton => 
      boton.closest('.Tarea').textContent.includes('Tarea de flujo completo')
    );
    
    if (botonEliminarNuevaTarea) {
      await userEvent.click(botonEliminarNuevaTarea);
    }
    
    await waitFor(() => {
      expect(screen.queryByText('Tarea de flujo completo')).not.toBeInTheDocument();
    });
  });

  test('guarda datos en localStorage al añadir tareas', async () => {
    
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
