/**
 * @jest-environment jsdom
 */

import { render, RenderResult, fireEvent } from '@testing-library/react';

import CompleteButton from './CompleteButton';

describe('CompleteButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderCompleteButton = (): RenderResult => (
    render((
      <CompleteButton
        handleClick={handleClick}
      />
    ))
  );

  it('renders "완료" button', () => {
    const { getByRole } = renderCompleteButton();

    const completeButton = getByRole('button', { name: '완료' });

    expect(completeButton).toBeInTheDocument();
  });

  it('listens to click event', () => {
    const { getByRole } = renderCompleteButton();

    fireEvent.click(getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalled();
  });
});
