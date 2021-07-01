/**
 * @jest-environment jsdom
 */

import { fireEvent, render, RenderResult } from '@testing-library/react';
import given from 'given2';

import TaskButton from './TaskButton';

describe('TaskButton', () => {
  const handleClickComplete = jest.fn();
  const handleClickDetail = jest.fn();

  const renderTaskButton = (): RenderResult => (
    render((
      <TaskButton
        id={1}
        isSubTasksEmpty={given.isSubTasksEmpty}
        isSubTasksOpen={given.isSubTasksOpen}
        handleClickComplete={handleClickComplete}
        handleClickDetail={handleClickDetail}
      />
    ))
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when subTasks is empty', () => {
    given('isSubTasksEmpty', () => true);

    it('renders "완료" button', () => {
      const { getByRole } = renderTaskButton();

      expect(getByRole('button', { name: '완료' })).toBeInTheDocument();
    });

    it('listens to click event', () => {
      const { getByRole } = renderTaskButton();

      fireEvent.click(getByRole('button', { name: '완료' }));

      expect(handleClickComplete).toBeCalled();
    });
  });

  context('when subTasks is not empty', () => {
    given('isSubTasksEmpty', () => false);

    context('when subTasks is opened', () => {
      given('isSubTasksOpen', () => true);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: '접기' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: '접기' }));

        expect(handleClickDetail).toBeCalled();
      });
    });

    context('when subTasks is closed', () => {
      given('isSubTasksOpen', () => false);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: '펼치기' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: '펼치기' }));

        expect(handleClickDetail).toBeCalled();
      });
    });
  });
});
