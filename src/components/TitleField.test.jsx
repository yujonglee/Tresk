/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import TitleField from './TitleField';

describe('Input', () => {
  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTitleField = () => (
    render((
      <TitleField
        value=""
        fieldName="할 일"
        handleChange={handleChange}
        handleClick={handleClick}
      />
    ))
  );

  it('renders input control', () => {
    const { getByRole } = renderTitleField();

    expect(getByRole('textbox', { lable: '할 일' })).toBeInTheDocument();
  });

  it('renders button', () => {
    const { getByRole } = renderTitleField();

    expect(getByRole('button', { name: 'add' })).toBeInTheDocument();
  });
});
