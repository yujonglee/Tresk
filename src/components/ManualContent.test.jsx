/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import ManualContent from './ManualContent';

describe('ManualContent', () => {
  it('renders instructions for buttons', () => {
    const { getByRole, getByText } = render(<ManualContent />);

    [
      ['Restore', '복구'],
      ['LogBook', '완료한'],
      ['Reset', '초기화'],
      ['Help', '무한'],
    ].forEach(([name, keyword]) => {
      fireEvent.click(getByRole('button', { name }));

      expect(getByText(keyword, { exact: false })).toBeInTheDocument();
    });
  });
});
