/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import given from 'given2';

import TaskButton from './TaskButton';

describe('TaskButton', () => {
  const handleClickComplete = jest.fn();
  const handleClickDetail = jest.fn();

  const renderTaskButton = () => (
    render((
      <TaskButton
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

      expect(getByRole('button', { name: 'complete' })).toBeInTheDocument();
    });

    it('listens to click event', () => {
      const { getByRole } = renderTaskButton();

      fireEvent.click(getByRole('button', { name: 'complete' }));

      expect(handleClickComplete).toBeCalled();
    });
  });

  context('when subTasks is not empty', () => {
    given('isSubTasksEmpty', () => false);

    context('when subTasks is opened', () => {
      given('isSubTasksOpen', () => true);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: 'fold' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: 'fold' }));

        expect(handleClickDetail).toBeCalled();
      });
    });

    context('when subTasks is closed', () => {
      given('isSubTasksOpen', () => false);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: 'unfold' })).toBeInTheDocument();
      });

      it('listens to click event', () => {
        const { getByRole } = renderTaskButton();

        fireEvent.click(getByRole('button', { name: 'unfold' }));

        expect(handleClickDetail).toBeCalled();
      });
    });
  });
});
