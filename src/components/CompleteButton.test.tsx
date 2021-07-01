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
        id={1}
        handleClick={handleClick}
      />
    ))
  );

  it('renders "완료" button with test id', () => {
    const { getByTestId } = renderCompleteButton();

    const completeButton = getByTestId('button-1');

    expect(completeButton).toBeInTheDocument();

    expect(completeButton).toHaveTextContent('완료');
  });

  it('listens to click event', () => {
    const { getByRole } = renderCompleteButton();

    fireEvent.click(getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalled();
  });
});
