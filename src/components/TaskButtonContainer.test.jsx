/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import TaskButtonContainer from './TaskButtonContainer';
import { deleteTask, toggleOpen } from '../redux_module/todoSlice';

describe('TaskButtonContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      todo: {
        tasks: {
          1: {
            title: 'task1',
            subTasks: given.subTasks,
            isOpen: given.isOpen,
          },
        },
      },
    }));
  });

  context('when subTasks is empty', () => {
    given('subTasks', () => []);

    it('deletes task on click event', () => {
      const taskId = 1;

      const { getByRole } = render(<TaskButtonContainer id={taskId} />);

      fireEvent.click(getByRole('button', { name: '완료' }));

      expect(dispatch).toBeCalledWith(deleteTask(taskId));
    });
  });

  context('when subTasks is not empty', () => {
    given('subTasks', () => [2]);

    context('when subTasks is opened', () => {
      given('isOpen', () => true);

      it('folds subTasks on click event', () => {
        const taskId = 1;

        const { getByRole } = render(<TaskButtonContainer id={taskId} />);

        fireEvent.click(getByRole('button', { name: '접기' }));
        expect(dispatch).toBeCalledWith(toggleOpen(taskId));
      });
    });

    context('when subTasks is closed', () => {
      given('isOpen', () => false);

      it('unfolds subTasks on click event', () => {
        const taskId = 1;

        const { getByRole } = render(<TaskButtonContainer id={taskId} />);

        fireEvent.click(getByRole('button', { name: '펼치기' }));
        expect(dispatch).toBeCalledWith(toggleOpen(taskId));
      });
    });
  });
});
