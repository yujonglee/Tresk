/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/react';
import { useSelector } from 'react-redux';
import given from 'given2';

import SubTasks from './SubTasks';

describe('SubTasks', () => {
  const renderSubTasks = (): RenderResult => (
    render((
      <SubTasks
        isOpen={given.isOpen}
        subTasks={[2, 3]}
      />
    ))
  );

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        tasks: {
          1: { title: 'task1', subTasks: [2, 3], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
          3: { title: 'task3', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when subTasks are opened', () => {
    given('isOpen', () => true);

    it('renders tasks', () => {
      const { getByText } = renderSubTasks();

      expect(getByText('task2')).toBeInTheDocument();
      expect(getByText('task3')).toBeInTheDocument();
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
