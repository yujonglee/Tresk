/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('renders input control', () => {
    const { getByRole } = render((
      <Input
        value=""
        fieldName="할 일"
        buttonName="추가"
        handleChange={jest.fn()}
        handleClick={jest.fn()}
      />
    ));

    expect(getByRole('textbox', { name: '할 일' })).toBeInTheDocument();
  });

  it('renders button', () => {
    const { getByRole } = render((
      <Input
        value=""
        fieldName="할 일"
        buttonName="추가"
        handleChange={jest.fn()}
        handleClick={jest.fn()}
      />
    ));

    expect(getByRole('button', { name: '추가' })).toBeInTheDocument();
  });
});
