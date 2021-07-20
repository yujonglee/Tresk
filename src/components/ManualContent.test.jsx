/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import ManualContent from './ManualContent';

describe('ManualContent', () => {
  it('renders instructions for buttons', () => {
    const { getByRole } = render(<ManualContent />);

    ['Add', 'Restore', 'LogBook', 'Reset', 'Help'].forEach((name) => {
      expect(getByRole('button', { name })).toBeInTheDocument();
    });
  });
});
