/**
 * @jest-environment jsdom
 */

import { useDispatch, useSelector } from 'react-redux';
import { render } from '@testing-library/react';

import Task from './Task';

describe('Task', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        tasks: {
          0: { title: 'root', subTasks: [1, 2], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
          2: { title: 'task2', subTasks: [3], isOpen: true },
          3: { title: 'task3', subTasks: [4], isOpen: true },
          4: { title: 'task4', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  it('renders tasks recursively', () => {
    const { getByText } = render(<Task id={0} />);

    ['task1', 'task2', 'task3', 'task4'].forEach((title) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});
