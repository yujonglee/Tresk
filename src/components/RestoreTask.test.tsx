/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { restoreTask } from '../redux_module/todoSlice';

import RestoreTask from './RestoreTask';

describe('RestoreTask', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it('', () => {
    const { getByRole } = render(<RestoreTask />);

    fireEvent.click(getByRole('button'));

    expect(dispatch).toBeCalledWith(restoreTask());
  });
});
