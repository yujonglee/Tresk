/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import given from 'given2';

import SubTasks from './SubTasks';

describe('SubTasks', () => {
  const renderSubTasks = () => (
    render((
      <SubTasks
        isOpen={given.isOpen}
        subTasks={[3, 2, 1]}
      />
    ))
  );

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        remainingTasks: {
          1: { title: 'task1', subTasks: [], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
          3: { title: 'task3', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when subTasks are opened', () => {
    given('isOpen', () => true);

    it('renders task in order', () => {
      const { getAllByRole } = renderSubTasks();

      const tasks = getAllByRole('listitem');

      expect(tasks[0]).toHaveTextContent('task3');
      expect(tasks[1]).toHaveTextContent('task2');
      expect(tasks[2]).toHaveTextContent('task1');
    });
  });

  context('when subTasks are closed', () => {
    given('isOpen', () => false);

    it('renders nothing', () => {
      const { queryByText } = renderSubTasks();

      expect(queryByText('task2')).not.toBeInTheDocument();
      expect(queryByText('task3')).not.toBeInTheDocument();
    });
  });
});
