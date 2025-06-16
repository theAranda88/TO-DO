import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContenedorIzq } from './ContenedorIzq';

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

window.alert = jest.fn();

describe('Casos de Prueba Documentados - Gestión Básica de Tareas', () => {
  const mockAddTarea = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('TC002 - Crear tarea vacía', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    
    expect(mockAddTarea).not.toHaveBeenCalled();
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    expect(input).toBeInTheDocument();
  });

  test('TC003 - Crear tarea con espacios', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, '   ');
    await userEvent.click(button);
    
    expect(mockAddTarea).not.toHaveBeenCalled();
  });

  test('TC004 - Crear tarea con caracteres especiales', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    const tareaEspecial = '🚀 Tarea @#$%';
    
    await userEvent.type(input, tareaEspecial);
    await userEvent.click(button);
    
    expect(mockAddTarea).toHaveBeenCalledWith(tareaEspecial);
  });

  test('TC005 - Crear tarea muy larga', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    const textoLargo = 'A'.repeat(1000);
    await userEvent.type(input, textoLargo);
    await userEvent.click(button);
    
    expect(mockAddTarea).toHaveBeenCalledWith(textoLargo);
  });
});

