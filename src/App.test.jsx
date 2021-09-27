/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import {
  selectInside, selectNext, selectOutside, selectPrevious,
} from './redux_module/todoSlice';
import App from './App';

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

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  it('listens to ArrowUp keyDown events', () => {
    fireEvent.keyDown(window, { key: 'ArrowUp', code: 'ArrowUp' });

    expect(dispatch).toBeCalledWith(selectPrevious());
  });

  it('listens to ArrowDown keyDown events', () => {
    fireEvent.keyDown(window, { key: 'ArrowDown', code: 'ArrowDown' });

    expect(dispatch).toBeCalledWith(selectNext());
  });

  it('listens to ArrowLeft keyDown events', () => {
    fireEvent.keyDown(window, { key: 'ArrowLeft', code: 'ArrowLeft' });

    expect(dispatch).toBeCalledWith(selectOutside());
  });

  it('listens to ArrowRight keyDown events', () => {
    fireEvent.keyDown(window, { key: 'ArrowRight', code: 'ArrowRight' });

    expect(dispatch).toBeCalledWith(selectInside());
  });
});
