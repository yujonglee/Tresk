/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import MainTask from './MainTask';

describe('MainTask', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        tasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  it('renders', () => {
    render(<MainTask id={1} />);
  });
});
