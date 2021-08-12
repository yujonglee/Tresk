/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import given from 'given2';

import TaskTitle from './TaskTitle';

describe('TaskTitle', () => {
  const handleClick = jest.fn();

  const renderTaskTitle = () => render((
    <TaskTitle
      title={given.title}
      isSelected={given.isSelected}
    />
  ));

  beforeEach(() => {
    handleClick.mockClear();
  });

  context('when title not includes url', () => {
    given('title', () => 'taskTitle');

    it('renders title', () => {
      const { getByText } = renderTaskTitle();

      expect(getByText('taskTitle')).toBeInTheDocument();
    });
  });

  context('when title includes url', () => {
    given('title', () => 'blog : [https://yujonglee.com](이유종)');

    it('renders title with url link', () => {
      const { getByText, getByRole } = renderTaskTitle();

      expect(getByText(/blog/)).toBeInTheDocument();

      expect(getByRole('link', { name: '이유종' }))
        .toHaveAttribute('href', 'https://yujonglee.com');
    });
  });
});
