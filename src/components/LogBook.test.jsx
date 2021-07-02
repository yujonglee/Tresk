/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import LogBook from './LogBook';

describe('LogBook', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        recentDeleted: [
          {
            task: { title: 'task1', subTasks: [], isOpen: true },
            selfId: 1,
            parentId: 0,
          },
        ],
      },
    }));
  });

  it('renders deleted tasks', () => {
    const { container } = render(<LogBook />);

    expect(container).toHaveTextContent('task1');
  });

  it('renders "복구" button', () => {
    const { getByRole } = render(<LogBook />);

    expect(getByRole('button', { name: '복구' })).toBeInTheDocument();
  });
});
