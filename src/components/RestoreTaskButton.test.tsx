/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { restoreTask } from '../redux_module/todoSlice';

import RestoreTaskButton from './RestoreTaskButton';

describe('RestoreTask', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it('renders "복구" button listening click event', () => {
    const { getByRole } = render(<RestoreTaskButton />);

    fireEvent.click(getByRole('button', { name: '복구' }));

    expect(dispatch).toBeCalledWith(restoreTask());
  });
});
