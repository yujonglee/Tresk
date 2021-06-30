/**
 * @jest-environment jsdom
 */

import { useDispatch, useSelector } from 'react-redux';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import given from 'given2';

import { updateCurrentTaskId } from '../redux_module/todoSlice';
import Task from './Task';

describe('Task', () => {
  const dispatch = jest.fn();

  const renderTask = (id: number): RenderResult => render((
    <Task id={id} />
  ));

  beforeEach(() => {
    dispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: { tasks: given.tasks },
    }));
  });

  describe('title', () => {
    given('tasks', () => ({
      1: { title: 'task1', subTasks: [] },
    }));

    it('is rendered', () => {
      const { container } = renderTask(1);

      expect(container).toHaveTextContent('task1');
    });

    context('when title is cilcked', () => {
      it('updates currentTaskId', () => {
        const { getByText } = renderTask(1);
        fireEvent.click(getByText('task1'));

        expect(dispatch).toBeCalledWith(updateCurrentTaskId(1));
      });
    });
  });

  context('when id is 0', () => {
    given('tasks', () => ({
      0: { title: 'root', subTasks: [] },
    }));

    it('is not rendered', () => {
      const { queryByText } = renderTask(0);

      expect(queryByText('root')).not.toBeInTheDocument();
    });
  });

  context('when subTasks is opened', () => {
    given('tasks', () => ({
      1: { title: 'task1', subTasks: [2], isOpen: true },
      2: { title: 'task2', subTasks: [], isOpen: true },
    }));

    it('renders subTask title', () => {
      const { container } = renderTask(1);

      expect(container).toHaveTextContent('task1');
      expect(container).toHaveTextContent('task2');
    });
  });

  context('when subTasks is not opened', () => {
    given('tasks', () => ({
      1: { title: 'task1', subTasks: [2], isOpen: false },
      2: { title: 'task2', subTasks: [], isOpen: false },
    }));

    it("doesn't renders subTask title", () => {
      const { container } = renderTask(1);

      expect(container).toHaveTextContent('task1');
      expect(container).not.toHaveTextContent('task2');
    });
  });
});
