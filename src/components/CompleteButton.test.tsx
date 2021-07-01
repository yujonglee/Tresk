/**
 * @jest-environment jsdom
 */

import { render, RenderResult, fireEvent } from '@testing-library/react';

import CompleteButton from './CompleteButton';

describe('CompleteButton', () => {
  const taskId = 1;

  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderCompleteButton = (): RenderResult => (
    render((
      <CompleteButton
        id={taskId}
        handleClick={handleClick}
      />
    ))
  );

  it('renders "완료" button with test id', () => {
    const { getByRole } = renderCompleteButton();

    const completeButton = getByRole('button', { name: '완료' });

    expect(completeButton).toBeInTheDocument();

    expect(completeButton).toHaveAttribute('data-testid', `button-${taskId}`);
  });

  it('listens to click event', () => {
    const { getByRole } = renderCompleteButton();

    fireEvent.click(getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalled();
  });
});
