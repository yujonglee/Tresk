/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import given from 'given2';

import TaskTitle from './TaskTitle';

describe('TaskTitle', () => {
  const title = 'taskTitle';

  const handleClick = jest.fn();

  const renderTaskTitle = () => render((
    <TaskTitle
      title={title}
      isSelected={given.isSelected}
      handleClick={handleClick}
    />
  ));

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders button with title', () => {
    const { getByRole } = renderTaskTitle();

    expect(getByRole('button', { name: title })).toBeInTheDocument();
  });

  it('renders button listening click event', () => {
    const { getByRole } = renderTaskTitle();

    fireEvent.click(getByRole('button', { name: title }));

    expect(handleClick).toBeCalled();
  });
});
