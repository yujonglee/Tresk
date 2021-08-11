/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import given from 'given2';

import TaskTitle from './TaskTitle';

describe('TaskTitle', () => {
  const title = 'taskTitle';

  const handleClick = jest.fn();

  const renderTaskTitle = () => render((
    <TaskTitle
      title={title}
      isSelected={given.isSelected}
    />
  ));

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders title', () => {
    const { getByText } = renderTaskTitle();

    expect(getByText('taskTitle')).toBeInTheDocument();
  });
});
