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
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        tasks: {
          1: { title: 'task1', subTasks: given.subTasks, isOpen: given.isOpen },
          2: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when subTasks is empty', () => {
    given('subTasks', () => []);

    it('deletes task on click event', () => {
      const { getByRole } = render(<TaskButtonContainer id={1} />);

      fireEvent.click(getByRole('button', { name: '완료' }));
      expect(dispatch).toBeCalledWith(deleteTask(1));
    });
  });

  context('when subTasks is not empty', () => {
    given('subTasks', () => [2]);

    context('when subTasks is opened', () => {
      given('isOpen', () => true);

      it('deletes task on click event', () => {
        const { getByRole } = render(<TaskButtonContainer id={1} />);

        fireEvent.click(getByRole('button', { name: '접기' }));
        expect(dispatch).toBeCalledWith(toggleOpen(1));
      });
    });

    context('when subTasks is closed', () => {
      given('isOpen', () => false);

      it('deletes task on click event', () => {
        const { getByRole } = render(<TaskButtonContainer id={1} />);

        fireEvent.click(getByRole('button', { name: '펼치기' }));
        expect(dispatch).toBeCalledWith(toggleOpen(1));
      });
    });
  });
});
