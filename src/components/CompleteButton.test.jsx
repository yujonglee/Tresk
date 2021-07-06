/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';

import CompleteButton from './CompleteButton';

describe('CompleteButton', () => {
  const handleClick = jest.fn();

  beforeEach(() => {
    handleClick.mockClear();
  });

  const renderCompleteButton = () => (
    render((
      <CompleteButton
        handleClick={handleClick}
      />
    ))
  );

  it('renders button listening click event', () => {
    const { getByRole } = renderCompleteButton();

    fireEvent.click(getByRole('button', { name: /complete/i }));

    expect(handleClick).toBeCalled();
  });
});
