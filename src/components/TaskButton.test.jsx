/**
 * @jest-environment jsdom
 */

import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import given from 'given2';

import { deleteTask, toggleSubTasksOpen } from '../redux_module/todoSlice';
import TaskButton from './TaskButton';

describe('TaskButton', () => {
  const id = 0;

  const dispatch = jest.fn();

  const renderTaskButton = () => (
    render((
      <TaskButton
        id={id}
        isSubTasksEmpty={given.isSubTasksEmpty}
        isSubTasksOpen={given.isSubTasksOpen}
      />
    ))
  );

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);

    dispatch.mockClear();
  });

  context('when subTasks is empty', () => {
    given('isSubTasksEmpty', () => true);

    it('renders "완료" button', () => {
      const { getByRole } = renderTaskButton();

      expect(getByRole('button', { name: 'complete' })).toBeInTheDocument();
    });

    it('listens to click event', () => {
      const { getByRole } = renderTaskButton();

      fireEvent.click(getByRole('button', { name: 'complete' }));

      expect(dispatch).toBeCalledWith(deleteTask(id));
    });
  });

  context('when subTasks is not empty', () => {
    given('isSubTasksEmpty', () => false);

    context('when subTasks is opened', () => {
      given('isSubTasksOpen', () => true);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: 'fold' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: 'fold' }));

        expect(dispatch).toBeCalledWith(toggleSubTasksOpen(id));
      });
    });

    context('when subTasks is closed', () => {
      given('isSubTasksOpen', () => false);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: 'unfold' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: 'unfold' }));

        expect(dispatch).toBeCalledWith(toggleSubTasksOpen(id));
      });
    });
  });
});
