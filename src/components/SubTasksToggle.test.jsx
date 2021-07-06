/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import given from 'given2';
import { useDispatch } from 'react-redux';
import { toggleSubTasksOpen } from '../redux_module/todoSlice';

import SubTasksToggle from './SubTasksToggle';

describe('SubTasksToggle', () => {
  const id = 0;

  const dispatch = jest.fn();

  const renderSubTasksToggle = () => (
    render((
      <SubTasksToggle
        id={id}
        isOpen={given.isOpen}
      />
    ))
  );

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
    dispatch.mockClear();
  });

  context('when subTasks is opened', () => {
    given('isOpen', () => true);

    it('renders "접기" button', () => {
      const { getByRole } = renderSubTasksToggle();

      expect(getByRole('button', { name: 'fold' })).toBeInTheDocument();
    });

    it('listens to click event', () => {
      const { getByRole } = renderSubTasksToggle();

      fireEvent.click(getByRole('button', { name: 'fold' }));
      expect(dispatch).toBeCalledWith(toggleSubTasksOpen(id));
    });
  });

  context('when subTasks is closed', () => {
    given('isOpen', () => false);

    it('renders "펼치기" button', () => {
      const { getByRole } = renderSubTasksToggle();

      expect(getByRole('button', { name: 'unfold' })).toBeInTheDocument();
    });

    it('listens to click event', () => {
      const { getByRole } = renderSubTasksToggle();

      fireEvent.click(getByRole('button', { name: 'unfold' }));
      expect(dispatch).toBeCalledWith(toggleSubTasksOpen(id));
    });
  });
});
