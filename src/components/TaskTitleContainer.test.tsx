/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrentTaskId } from '../redux_module/todoSlice';
import TaskTitleContainer from './TaskTitleContainer';

describe('TaskTitleContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);

    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        currentTaskId: 1,
        tasks: {
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  it('renders button listening click event', () => {
    const { getByRole } = render(<TaskTitleContainer id={1} />);

    fireEvent.click(getByRole('button', { name: 'task1' }));

    expect(dispatch).toBeCalledWith(updateCurrentTaskId(1));
  });
});
