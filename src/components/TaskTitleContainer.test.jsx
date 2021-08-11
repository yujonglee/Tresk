/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import given from 'given2';

import palette from '../color';
import provideThemeTo from '../provideThemeTo';
import TaskTitleContainer from './TaskTitleContainer';

describe('TaskTitleContainer', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        selectedTaskId: given.selectedTaskId,
        remainingTasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  const currentTaskId = 1;

  context('when task is selected', () => {
    given('selectedTaskId', () => currentTaskId);

    it('renders title with primary color', () => {
      const { getByText } = render(
        provideThemeTo(<TaskTitleContainer id={currentTaskId} />),
      );

      expect(getByText('task1')).toHaveStyle({ color: palette.primary.main });
    });
  });

  context('when task is not selected', () => {
    given('selectedTaskId', () => currentTaskId - 1);

    it('renders title with primary color', () => {
      const { getByText } = render(
        provideThemeTo(<TaskTitleContainer id={currentTaskId} />),
      );

      expect(getByText('task1')).toHaveStyle({ color: palette.secondary.main });
    });
  });
});
