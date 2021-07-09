/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import given from 'given2';
import { useSelector } from 'react-redux';

import SubTasksContainer from './SubTasksContainer';

describe('SubTasksContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        tasks: {
          1: { title: 'task1', subTasks: [3, 2], isOpen: given.isOpen },
          2: { title: 'task2', subTasks: [], isOpen: true },
          3: { title: 'task3', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when subTasks are opened', () => {
    given('isOpen', () => true);

    it('renders tasks', () => {
      const { getByText } = render(<SubTasksContainer id={1} />);

      expect(getByText('task2')).toBeInTheDocument();
      expect(getByText('task3')).toBeInTheDocument();
    });
  });

  context('when subTasks are closed', () => {
    given('isOpen', () => false);

    it('renders nothing', () => {
      const { queryByText } = render(<SubTasksContainer id={1} />);

      expect(queryByText('task2')).not.toBeInTheDocument();
      expect(queryByText('task3')).not.toBeInTheDocument();
    });
  });
});
