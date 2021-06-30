/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { highlight, original } from './fixture/color';
import Header from './Header';

describe('Header', () => {
  context('when root is selected', () => {
    it('renders header with highlight color', () => {
      const { getByText } = render(<Header initialTaskId={0} />);

      expect(getByText('Tresk')).toHaveStyle({
        color: highlight,
      });
    });
  });

  context('when task is selected', () => {
    it('renders header with original color', () => {
      const { getByText } = render(<Header initialTaskId={1} />);

      expect(getByText('Tresk')).toHaveStyle({
        color: original,
      });
    });
  });
});
