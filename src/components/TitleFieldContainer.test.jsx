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

  context('when Enter key is pressed', () => {
    it('adds task', () => {
      const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

      fireEvent.keyDown(
        getByRole('textbox', { lable: '할 일' }),
        { key: 'Enter', code: 'Enter' },
      );

      expect(dispatch).toBeCalledWith(
        addTask('task1'),
      );
    });
  });

  context('when key other than Enter is pressed', () => {
    it('does noting', () => {
      const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

      fireEvent.keyDown(
        getByRole('textbox', { lable: '할 일' }),
        { key: 'd', code: 'KeyD' },
      );

      expect(dispatch).not.toBeCalled();
    });
  });

  it('closes logBook and open todo list on focus', () => {
    const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

    const inputField = getByRole('textbox');
    inputField.focus();

    expect(dispatch).toBeCalledWith(toggleLogBookOpen(false));
  });
});
