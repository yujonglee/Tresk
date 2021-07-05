/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { resetRecentDeleted } from '../redux_module/todoSlice';

import ResetLogButton from './ResetLogButton';

describe('ResetLogButton', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  it('renders "초기화" button', () => {
    const { getByRole } = render(<ResetLogButton />);

    expect(getByRole('button', { name: '초기화' })).toBeInTheDocument();
  });

  it('listens to click event', () => {
    const { getByRole } = render(<ResetLogButton />);

    fireEvent.click(getByRole('button', { name: '초기화' }));

    expect(dispatch).toBeCalledWith(resetRecentDeleted());
  });
});
