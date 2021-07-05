/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import given from 'given2';
import { useSelector } from 'react-redux';

import LogBookContainer from './LogBookContainer';

describe('LogBookContainer', () => {
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

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      todo: {
        recentDeleted: given.recentDeleted,
      },
    }));
  });

  const renderLogBookContainer = () => (
    render(<LogBookContainer initialOpen={given.initialOpen} />)
  );

  context("when there aren't any deleted tasks", () => {
    given('recentDeleted', () => []);

    it('renders "로그 없음" button', () => {
      const { getByRole } = renderLogBookContainer();

      expect(getByRole('button', { name: '로그 없음' })).toBeInTheDocument();
    });
  });

  context('when there are deleted tasks', () => {
    given('recentDeleted', () => recentDeleted);

    context('when LogBook is closed', () => {
      given('initialOpen', () => false);

      it('renders nothing', () => {
        const { container, queryByRole } = renderLogBookContainer();

        expect(container).not.toHaveTextContent('# task1');
        expect(container).not.toHaveTextContent('# task2');
        expect(container).not.toHaveTextContent('## task3');

        expect(queryByRole('button', { name: '복구' })).not.toBeInTheDocument();
      });

      it('renders "로그 열기" button', () => {
        const { getByRole } = renderLogBookContainer();

        expect(getByRole('button', { name: '로그 열기' })).toBeInTheDocument();
      });
    });

    context('when LogBook is opened', () => {
      given('initialOpen', () => true);

      it('renders deleted tasks', () => {
        const { container } = renderLogBookContainer();

        expect(container).toHaveTextContent('# task1');
        expect(container).toHaveTextContent('# task2');
        expect(container).toHaveTextContent('## task3');
      });

      it('renders "로그 닫기" button', () => {
        const { getByRole } = renderLogBookContainer();

        expect(getByRole('button', { name: '로그 닫기' })).toBeInTheDocument();
      });
    });
  });
});
