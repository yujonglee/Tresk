/**
 * @jest-environment jsdom
 */

import { render, RenderResult, fireEvent } from '@testing-library/react';
import given from 'given2';

import SubTasksToggle from './SubTasksToggle';

describe('SubTasksToggle', () => {
  const taskId = 1;

  const handleClick = jest.fn();

  const renderSubTasksToggle = (): RenderResult => (
    render((
      <SubTasksToggle
        taskId={taskId}
        isOpen={given.isOpen}
        handleClick={handleClick}
      />
    ))
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders button that has test id by task id', () => {
    const { getByRole } = renderSubTasksToggle();

    expect(getByRole('button')).toHaveAttribute('data-testid', `button-${taskId}`);
  });

  it('listens to click event', () => {
    const { getByTestId } = renderSubTasksToggle();

    fireEvent.click(getByTestId(`button-${taskId}`));
    expect(handleClick).toBeCalled();
  });

  context('when subTasks is opened', () => {
    given('isOpen', () => true);

    it('renders "접기" button', () => {
      const { getByTestId } = renderSubTasksToggle();

      expect(getByTestId(`button-${taskId}`)).toHaveTextContent('접기');
    });
  });

  context('when subTasks is closed', () => {
    given('isOpen', () => false);

    it('renders "펼치기" button', () => {
      const { getByTestId } = renderSubTasksToggle();

      expect(getByTestId(`button-${taskId}`)).toHaveTextContent('펼치기');
    });
  });
});
