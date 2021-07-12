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
        completedTasks: [],
        isLogBookOpen: true,
      },
    }));
  });

  it('renders', () => {
    render(<LogBookControlContainer />);
  });
});
