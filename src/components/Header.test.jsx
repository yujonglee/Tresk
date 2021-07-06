/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders header', () => {
    const { getByText } = render(<Header initialTaskId={0} />);

    expect(getByText('Tresk')).toBeInTheDocument();
  });
});
