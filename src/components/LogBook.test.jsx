/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import LogBook from './LogBook';

describe('LogBook', () => {
  const recentDeleted = [
    {
      task: { title: 'task3', subTasks: [], isOpen: true },
      selfId: 3,
      parentId: 2,
    },
    {
      task: { title: 'task1', subTasks: [], isOpen: true },
      selfId: 1,
      parentId: 0,
    },
    {
      task: { title: 'task2', subTasks: [], isOpen: true },
      selfId: 2,
      parentId: 0,
    },
  ];

  const renderLogBook = () => render(<LogBook deletedTasks={recentDeleted} />);

  it('renders deleted tasks', () => {
    const { container } = renderLogBook();

    expect(container).toHaveTextContent('# task1');
    expect(container).toHaveTextContent('# task2');
    expect(container).toHaveTextContent('## task3');
  });
});
