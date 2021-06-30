/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/react';
import given from 'given2';

import { highlight, original } from '../fixture/color';
import TaskTitle from './TaskTitle';

describe('TaskTitle', () => {
  const handleClick = jest.fn();

  const renderTaskTitle = (): RenderResult => render(
    <TaskTitle
      title="taskTitle"
      isSelected={given.isSelected}
      handleClick={handleClick}
    />,
  );

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('renders button with title', () => {
    const { getByRole } = renderTaskTitle();

    expect(getByRole('button', { name: 'taskTitle' })).toBeInTheDocument();
  });

  context('when task is selected', () => {
    given('isSelected', () => true);

    it('renders button with highlight color', () => {
      const { getByRole } = renderTaskTitle();

      expect(getByRole('button', { name: 'taskTitle' })).toHaveStyle({
        color: highlight,
      });
    });
  });

  context('when task is not selected', () => {
    given('isSelected', () => false);

    it('renders button with original color', () => {
      const { getByRole } = renderTaskTitle();

      expect(getByRole('button', { name: 'taskTitle' })).toHaveStyle({
        color: original,
      });
    });
  });
});
