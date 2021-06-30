/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import given from 'given2';

import TaskButton from './TaskButton';

function renderTaskButton() {
  return (
    render((
      <TaskButton
        id={1}
        isSubTasksEmpty={given.isSubTasksEmpty}
        isSubTasksOpen={given.isSubTasksOpen}
        handleClickDetail={jest.fn()}
        handleClickComplete={jest.fn()}
      />
    ))
  );
}

describe('TaskButton', () => {
  context('when subTasks is empty', () => {
    given('isSubTasksEmpty', () => true);

    it('renders complete button', () => {
      const { getByRole } = renderTaskButton();

      expect(getByRole('button', { name: '완료' })).toBeInTheDocument();
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
    });

    context('when subTasks is closed', () => {
      given('isSubTasksOpen', () => false);

      it('renders 접기 button', () => {
        const { getByRole } = renderTaskButton();

        expect(getByRole('button', { name: '펼치기' })).toBeInTheDocument();
      });
    });
  });
});
