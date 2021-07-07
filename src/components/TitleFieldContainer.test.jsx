/**
 * @jest-environment jsdom
 */

import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { addTask, toggleLogBookOpen } from '../redux_module/todoSlice';
import TitleFieldContainer from './TitleFieldContainer';

describe('Input', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  it('adds tasks with button', () => {
    const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

    fireEvent.click(getByRole('button', { name: 'add' }));

    expect(dispatch).toBeCalledWith(
      addTask('task1'),
    );
  });

  it('closes logBook and open todo list on focus', () => {
    const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

    const inputField = getByRole('textbox');
    inputField.focus();

    expect(dispatch).toBeCalledWith(toggleLogBookOpen(false));
  });
});
