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
    useDispatch.mockReturnValue(dispatch);
  });

  it('renders "되돌리기" button listening click event', () => {
    const { getByRole } = render(<RestoreTaskButton />);

    fireEvent.click(getByRole('button', { name: 'restore' }));

    expect(dispatch).toBeCalledWith(restoreTask());
  });
});
