/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import given from 'given2';
import { useDispatch, useSelector } from 'react-redux';

import { toggleLogBookOpen } from '../redux_module/todoSlice';
import LogBookContainer from './LogBookContainer';

describe('LogBookContainer', () => {
  const dispatch = jest.fn();

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
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      todo: {
        isLogBookOpen: given.isLogBookOpen,
        recentDeleted: given.recentDeleted || [],
      },
    }));
  });

  it('renders "초기화" button', () => {
    const { getByRole } = render(<LogBookContainer />);

    expect(getByRole('button', { name: '초기화' })).toBeInTheDocument();
  });

  context("when there aren't any deleted tasks", () => {
    given('recentDeleted', () => []);

    it('renders "로그 없음" button', () => {
      const { getByRole } = render(<LogBookContainer />);

      expect(getByRole('button', { name: '로그 없음' })).toBeInTheDocument();
    });
  });

  context('when there are deleted tasks', () => {
    given('recentDeleted', () => recentDeleted);

    context('when LogBook is closed', () => {
      given('isLogBookOpen', () => false);

      it('renders nothing', () => {
        const { container, queryByRole } = render(<LogBookContainer />);

        expect(container).not.toHaveTextContent('# task1');
        expect(container).not.toHaveTextContent('# task2');
        expect(container).not.toHaveTextContent('## task3');

        expect(queryByRole('button', { name: '복구' })).not.toBeInTheDocument();
      });

      it('renders "로그 열기" button listening click event', () => {
        const { getByRole } = render(<LogBookContainer />);

        fireEvent.click(getByRole('button', { name: '로그 열기' }));

        expect(dispatch).toBeCalledWith(toggleLogBookOpen());
      });
    });

    context('when LogBook is opened', () => {
      given('isLogBookOpen', () => true);

      it('renders deleted tasks', () => {
        const { container } = render(<LogBookContainer />);

        expect(container).toHaveTextContent('# task1');
        expect(container).toHaveTextContent('# task2');
        expect(container).toHaveTextContent('## task3');
      });

      it('renders "로그 닫기" button', () => {
        const { getByRole } = render(<LogBookContainer />);

        fireEvent.click(getByRole('button', { name: '로그 닫기' }));

        expect(dispatch).toBeCalledWith(toggleLogBookOpen());
      });
    });
  });
});
