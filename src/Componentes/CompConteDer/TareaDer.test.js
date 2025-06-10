import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TareaDer } from './TareaDer';

jest.mock('../../Imagenes/comprobado.png', () => 'mock-check-image');
jest.mock('../../Imagenes/documento.png', () => 'mock-document-image');
jest.mock('../../Imagenes/borrar.png', () => 'mock-delete-image');

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

describe('TareaDer - Componente de Tarea Individual', () => {
  const mockProps = {
    nombre: 'Tarea de prueba',
    completado: false,
    onCompletar: jest.fn(),
    onDelete: jest.fn(),
    onOpenModal: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test('renderiza correctamente una tarea no completada', () => {
    render(<TareaDer {...mockProps} />);
    
    const nombreTarea = screen.getByText('Tarea de prueba');
    expect(nombreTarea).toBeInTheDocument();
    
    const tareaContainer = screen.getByText('Tarea de prueba').closest('.Tarea');
    expect(tareaContainer).not.toHaveClass('completed');
    
    const imagenes = screen.getAllByRole('img');
    expect(imagenes).toHaveLength(3);
  });

  test('renderiza correctamente una tarea completada', () => {
    const propsCompletada = { ...mockProps, completado: true };
    render(<TareaDer {...propsCompletada} />);
    
    const nombreTarea = screen.getByText('Tarea de prueba');
    expect(nombreTarea).toBeInTheDocument();
    
    const tareaContainer = nombreTarea.closest('.Tarea');
    expect(tareaContainer).toHaveClass('completed');
    
    expect(nombreTarea).toHaveClass('completed');
  });

  test('llama a onCompletar cuando se hace clic en el nombre de la tarea', async () => {
    
    render(<TareaDer {...mockProps} />);
    
    const nombreTarea = screen.getByText('Tarea de prueba');
    await userEvent.click(nombreTarea);
    
    expect(mockProps.onCompletar).toHaveBeenCalledTimes(1);
  });

  test('llama a onDelete cuando se hace clic en el botón de eliminar', async () => {
    
    render(<TareaDer {...mockProps} />);
    
    const botonEliminar = screen.getByAltText('imagenDel');
    await userEvent.click(botonEliminar);
    
    expect(mockProps.onDelete).toHaveBeenCalledTimes(1);
  });

  test('llama a onOpenModal cuando se hace clic en el botón de actualizar', async () => {
    
    render(<TareaDer {...mockProps} />);
    
    const botonActualizar = screen.getByAltText('imagenAct');
    await userEvent.click(botonActualizar);
    
    expect(mockProps.onOpenModal).toHaveBeenCalledTimes(1);
  });

  test('muestra la imagen de check cuando la tarea está completada', () => {
    const propsCompletada = { ...mockProps, completado: true };
    render(<TareaDer {...propsCompletada} />);
    
    const imagenCheck = screen.getByAltText('imagenCheck');
    expect(imagenCheck).toBeInTheDocument();
    expect(imagenCheck).toHaveClass('completed-icon');
  });

  test('oculta la imagen de check cuando la tarea no está completada', () => {
    render(<TareaDer {...mockProps} />);
    
    const imagenCheck = screen.getByAltText('imagenCheck');
    expect(imagenCheck).toBeInTheDocument();
    expect(imagenCheck).toHaveClass('ocultar');
  });

  test('renderiza con nombres de tarea largos', () => {
    const propsNombreLargo = {
      ...mockProps,
      nombre: 'Esta es una tarea con un nombre muy largo que podría causar problemas de renderizado o desbordamiento en la interfaz de usuario'
    };
    
    render(<TareaDer {...propsNombreLargo} />);
    
    const nombreTarea = screen.getByText(propsNombreLargo.nombre);
    expect(nombreTarea).toBeInTheDocument();
  });

  test('maneja caracteres especiales en el nombre de la tarea', () => {
    const propsCaracteresEspeciales = {
      ...mockProps,
      nombre: 'Tarea con émojis 🚀 y símbolos @#$ y acentos ñáéíóú'
    };
    
    render(<TareaDer {...propsCaracteresEspeciales} />);
    
    const nombreTarea = screen.getByText(propsCaracteresEspeciales.nombre);
    expect(nombreTarea).toBeInTheDocument();
  });

  test('maneja nombre de tarea vacío', () => {
    const propsNombreVacio = {
      ...mockProps,
      nombre: ''
    };
    
    render(<TareaDer {...propsNombreVacio} />);
    
    const tareaContainer = screen.getByRole('listitem');
    expect(tareaContainer).toBeInTheDocument();
  });

  test('verifica la estructura correcta del DOM', () => {
    render(<TareaDer {...mockProps} />);
    
    const tareaContainer = screen.getByText('Tarea de prueba').closest('.Tarea');
    expect(tareaContainer).toBeInTheDocument();
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass('Ntarea');
  });

  test('todas las imágenes tienen atributos alt apropiados', () => {
    render(<TareaDer {...mockProps} />);
    
    expect(screen.getByAltText('imagenCheck')).toBeInTheDocument();
    expect(screen.getByAltText('imagenDel')).toBeInTheDocument();
    expect(screen.getByAltText('imagenAct')).toBeInTheDocument();
  });

  test('no llama a funciones cuando los props son undefined', () => {
    const propsUndefined = {
      nombre: 'Tarea sin funciones',
      completado: false
    };
    
    expect(() => {
      render(<TareaDer {...propsUndefined} />);
    }).not.toThrow();
  });

  test('cambia el estilo visual según el estado de completado', () => {
    const { rerender } = render(<TareaDer {...mockProps} />);
    
    let tareaContainer = screen.getByText('Tarea de prueba').closest('.Tarea');
    expect(tareaContainer).not.toHaveClass('completed');
    
    const propsCompletada = { ...mockProps, completado: true };
    rerender(<TareaDer {...propsCompletada} />);
    
    tareaContainer = screen.getByText('Tarea de prueba').closest('.Tarea');
    expect(tareaContainer).toHaveClass('completed');
  });
});

