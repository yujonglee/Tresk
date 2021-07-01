/**
 * @jest-environment jsdom
 */

import { fireEvent, render, RenderResult } from '@testing-library/react';
import given from 'given2';

import { highlight, original } from '../color';
import TaskTitle from './TaskTitle';

describe('TaskTitle', () => {
  const title = 'taskTitle';

  const handleClick = jest.fn();

  const renderTaskTitle = (): RenderResult => render((
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

  context('when task is selected', () => {
    given('isSelected', () => true);

    it('renders button with highlight color', () => {
      const { getByRole } = renderTaskTitle();

      expect(getByRole('button', { name: title })).toHaveStyle({
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
