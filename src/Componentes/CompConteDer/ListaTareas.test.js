import React from 'react';
import { render, screen } from '@testing-library/react';
import { ListaTareas } from './ListaTareas';
import { TareaDer } from './TareaDer';

describe('ListaTareas - Componente de Lista', () => {
  test('renderiza correctamente una lista vacía', () => {
    render(
      <ListaTareas>
        {/* Lista vacía */}
      </ListaTareas>
    );
    
    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();
    expect(lista).toHaveClass('ListaTareas');
  });

  test('renderiza correctamente con una tarea', () => {
    const mockProps = {
      nombre: 'Tarea de prueba',
      completado: false,
      onCompletar: jest.fn(),
      onDelete: jest.fn(),
      onOpenModal: jest.fn()
    };

    render(
      <ListaTareas>
        <TareaDer {...mockProps} />
      </ListaTareas>
    );
    
    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();
    
    const tareaTexto = screen.getByText('Tarea de prueba');
    expect(tareaTexto).toBeInTheDocument();
  });

  test('renderiza correctamente con múltiples tareas', () => {
    const tareas = [
      {
        key: 1,
        nombre: 'Primera tarea',
        completado: false,
        onCompletar: jest.fn(),
        onDelete: jest.fn(),
        onOpenModal: jest.fn()
      },
      {
        key: 2,
        nombre: 'Segunda tarea',
        completado: true,
        onCompletar: jest.fn(),
        onDelete: jest.fn(),
        onOpenModal: jest.fn()
      },
      {
        key: 3,
        nombre: 'Tercera tarea',
        completado: false,
        onCompletar: jest.fn(),
        onDelete: jest.fn(),
        onOpenModal: jest.fn()
      }
    ];

    render(
      <ListaTareas>
        {tareas.map(tarea => (
          <TareaDer
            key={tarea.key}
            nombre={tarea.nombre}
            completado={tarea.completado}
            onCompletar={tarea.onCompletar}
            onDelete={tarea.onDelete}
            onOpenModal={tarea.onOpenModal}
          />
        ))}
      </ListaTareas>
    );
    
    const lista = screen.getByRole('list');
    expect(lista).toBeInTheDocument();

    expect(screen.getByText('Primera tarea')).toBeInTheDocument();
    expect(screen.getByText('Segunda tarea')).toBeInTheDocument();
    expect(screen.getByText('Tercera tarea')).toBeInTheDocument();

    const itemsLista = screen.getAllByRole('listitem');
    expect(itemsLista).toHaveLength(3);
  });

  test('mantiene la estructura correcta del DOM', () => {
    render(
      <ListaTareas>
        <li>Item de prueba</li>
      </ListaTareas>
    );
    
    const lista = screen.getByRole('list');
    expect(lista.tagName).toBe('UL');
    expect(lista).toHaveClass('ListaTareas');
  });

  test('renderiza con props children dinámicos', () => {
    const { rerender } = render(
      <ListaTareas>
        <li>Elemento inicial</li>
      </ListaTareas>
    );
    
    expect(screen.getByText('Elemento inicial')).toBeInTheDocument();

    rerender(
      <ListaTareas>
        <li>Elemento actualizado</li>
        <li>Nuevo elemento</li>
      </ListaTareas>
    );
    
    expect(screen.getByText('Elemento actualizado')).toBeInTheDocument();
    expect(screen.getByText('Nuevo elemento')).toBeInTheDocument();
    expect(screen.queryByText('Elemento inicial')).not.toBeInTheDocument();
  });

  test('maneja lista con contenido mixto', () => {
    render(
      <ListaTareas>
        <li>Elemento de texto</li>
        <li>
          <span>Elemento con HTML anidado</span>
        </li>
        <li>
          <div>Elemento con div</div>
        </li>
      </ListaTareas>
    );
    
    const lista = screen.getByRole('list');
    const items = screen.getAllByRole('listitem');
    
    expect(lista).toBeInTheDocument();
    expect(items).toHaveLength(3);
    expect(screen.getByText('Elemento de texto')).toBeInTheDocument();
    expect(screen.getByText('Elemento con HTML anidado')).toBeInTheDocument();
    expect(screen.getByText('Elemento con div')).toBeInTheDocument();
  });
});

