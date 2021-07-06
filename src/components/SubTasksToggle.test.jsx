/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
import given from 'given2';

import SubTasksToggle from './SubTasksToggle';

describe('SubTasksToggle', () => {
  const handleClick = jest.fn();

  const renderSubTasksToggle = () => (
    render((
      <SubTasksToggle
        isOpen={given.isOpen}
        handleClick={handleClick}
      />
    ))
  );

  beforeEach(() => {
    handleClick.mockClear();
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
      expect(handleClick).toBeCalled();
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
      expect(handleClick).toBeCalled();
    });
  });
});
