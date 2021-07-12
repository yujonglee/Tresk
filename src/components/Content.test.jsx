/**
 * @jest-environment jsdom
 */

import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import given from 'given2';

import Content from './Content';

describe('Content', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        isLogBookOpen: given.isLogBookOpen,
        completedTasks: [
          {
            task: { title: 'task1', subTasks: [], isOpen: true },
            selfId: 1,
            parentId: 0,
          },
        ],
        remainingTasks: {
          0: { title: 'root', subTasks: [2], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  context('when logBook is opened', () => {
    given('isLogBookOpen', () => true);

    it('renders logBook, not todo list', () => {
      const { container } = render(<Content />);

      expect(container).toHaveTextContent('# task1');
      expect(container).not.toHaveTextContent('task2');
    });
  });

  context('when logBook is not opened', () => {
    given('isLogBookOpen', () => false);

    it('renders todo list, not logBook', () => {
      const { container } = render(<Content />);

      expect(container).not.toHaveTextContent('# task1');
      expect(container).toHaveTextContent('task2');
    });
  });
});
