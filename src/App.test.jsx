/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import { selectNext, selectPrevious } from './redux_module/todoSlice';

jest.mock('react-p5-wrapper');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      todo: {
        completedTasks: [],
        selectedTaskId: 0,
        tasks: {
          0: { title: 'root', subTasks: [1] },
          1: { title: 'task1', subTasks: [] },
        },
      },
    }));
  });

  it('listens to ArrowUp keyDown events', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: 'ArrowUp', code: 'ArrowUp' });
    expect(dispatch).toBeCalledWith(selectPrevious());
  });

  it('listens to ArrowDown keyDown events', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.keyDown(window, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(dispatch).toBeCalledWith(selectNext());
  });
});
