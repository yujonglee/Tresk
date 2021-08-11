/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { selectNewTask } from '../redux_module/todoSlice';
import SelectButton from './SelectButton';

jest.mock('react-redux');

describe('SelectButton', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  it('renders button to select task', () => {
    const id = 1;

    const { getByRole } = render(<SelectButton id={id} />);

    fireEvent.click(getByRole('button', { name: 'select' }));

    expect(dispatch).toBeCalledWith(selectNewTask(id));
  });
});
