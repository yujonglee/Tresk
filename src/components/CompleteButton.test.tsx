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

  it('renders button with test id', () => {
    const { getByTestId } = renderCompleteButton();

    expect(getByTestId('button-1')).toBeInTheDocument();
  });

  it('renders "완료" button', () => {
    const { getByRole } = renderCompleteButton();

    expect(getByRole('button', { name: '완료' })).toBeInTheDocument();
  });

  it('listens to click event', () => {
    const { getByRole } = renderCompleteButton();

    fireEvent.click(getByRole('button', { name: '완료' }));

    expect(handleClick).toBeCalled();
  });
});
