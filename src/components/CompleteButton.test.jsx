/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';

import { deleteTask } from '../redux_module/todoSlice';
import CompleteButton from './CompleteButton';

describe('CompleteButton', () => {
  const id = 0;

  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    dispatch.mockClear();
  });

  it('renders "완료" button listening click event', () => {
    const { getByRole } = render(<CompleteButton id={id} />);

    fireEvent.click(getByRole('button', { name: 'complete' }));

    expect(dispatch).toBeCalledWith(deleteTask(id));
  });
});
