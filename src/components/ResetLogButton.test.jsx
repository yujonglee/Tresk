/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { emptyCompletedTasks } from '../redux_module/todoSlice';

import ResetLogButton from './ResetLogButton';

describe('ResetLogButton', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  it('renders "초기화" button', () => {
    const { getByLabelText } = render(<ResetLogButton />);

    expect(getByLabelText('resetLog')).toBeInTheDocument();
  });

  it('listens to click event', () => {
    const { getByRole } = render(<ResetLogButton />);

    fireEvent.click(getByRole('button', { name: 'resetLog' }));

    expect(dispatch).toBeCalledWith(emptyCompletedTasks());
  });
});
