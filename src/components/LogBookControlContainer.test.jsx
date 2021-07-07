/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import LogBookControlContainer from './LogBookControlContainer';

describe('LogBookControlContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        recentDeleted: [],
        isLogBookOpen: true,
      },
    }));
  });

  it('renders', () => {
    render(<LogBookControlContainer />);
  });
});
