/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import { highlight, original } from '../color';
import { updateSelectedTaskId } from '../redux_module/todoSlice';
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
        tasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when currentTaskId == selectedTaskId', () => {
    given('selectedTaskId', () => 1);

    it('renders button with highlight color', () => {
      const { getByRole } = render(<TaskTitleContainer id={currentTaskId} />);

      expect(getByRole('button', { name: 'task1' })).toHaveStyle({
        color: highlight,
      });
    });
  });

  context('when currentTaskId != selectedTaskId', () => {
    given('selectedTaskId', () => 0);

    it('renders button with original color', () => {
      const { getByRole } = render(<TaskTitleContainer id={currentTaskId} />);

      expect(getByRole('button', { name: 'task1' })).toHaveStyle({
        color: original,
      });
    });
  });

  it('updates selected task id to current task id on click event', () => {
    const { getByRole } = render(<TaskTitleContainer id={currentTaskId} />);

    fireEvent.click(getByRole('button', { name: 'task1' }));

    expect(dispatch).toBeCalledWith(updateSelectedTaskId(currentTaskId));
  });
});
