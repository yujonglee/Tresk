/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';

jest.mock('react-p5-wrapper');

describe('App', () => {
  beforeEach(() => {
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

  it('renders', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
});
