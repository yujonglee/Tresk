/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import { selectNewTask } from '../redux_module/todoSlice';
import TaskTitleContainer from './TaskTitleContainer';

describe('TaskTitleContainer', () => {
  const currentTaskId = 1;

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      todo: {
        selectedTaskId: given.selectedTaskId,
        remainingTasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  it('updates selected task id to current task id on click event', () => {
    const { getByRole } = render(<TaskTitleContainer id={currentTaskId} />);

    fireEvent.click(getByRole('button', { name: 'task1' }));

    expect(dispatch).toBeCalledWith(selectNewTask(currentTaskId));
  });
});
