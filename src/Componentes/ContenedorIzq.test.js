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

describe('ContenedorIzq - Formulario de Tareas', () => {
  const mockAddTarea = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renderiza correctamente todos los elementos del formulario', () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    expect(input).toBeInTheDocument();
    
    const label = screen.getByText('Nombre de Tarea');
    expect(label).toBeInTheDocument();
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('permite escribir en el campo de texto', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    
    await userEvent.type(input, 'Nueva tarea de prueba');
    
    expect(input).toHaveValue('Nueva tarea de prueba');
  });

  test('añade una nueva tarea cuando se hace clic en el botón', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');

    await userEvent.type(input, 'Tarea de prueba');

    await userEvent.click(button);
    
    expect(mockAddTarea).toHaveBeenCalledWith('Tarea de prueba');
    expect(mockAddTarea).toHaveBeenCalledTimes(1);
  });

  test('limpia el input después de añadir una tarea', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea temporal');
    await userEvent.click(button);
    
    expect(input).toHaveValue('');
  });

  test('no añade tarea si el campo está vacío', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    
    expect(mockAddTarea).not.toHaveBeenCalled();
  });

  test('no añade tarea si el campo solo contiene espacios en blanco', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, '   ');
    await userEvent.click(button);
    
    expect(mockAddTarea).not.toHaveBeenCalled();
  });

  test('guarda datos en localStorage cuando se añade una tarea', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    await userEvent.type(input, 'Tarea para localStorage');
    await userEvent.click(button);
    
    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Almacenando datos');
    });
  });

  test('maneja caracteres especiales en el input', async () => {
    render(<ContenedorIzq addTarea={mockAddTarea} />);
    
    const input = screen.getByPlaceholderText('Ingrese su Tarea');
    const button = screen.getByRole('button');
    
    const tareaConCaracteresEspeciales = 'Tarea con émojis 🚀 y símbolos @#$';
    
    await userEvent.type(input, tareaConCaracteresEspeciales);
    await userEvent.click(button);
    
    expect(mockAddTarea).toHaveBeenCalledWith(tareaConCaracteresEspeciales);
  });
});

