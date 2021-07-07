/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import given from 'given2';

import LogBookContainer from './LogBookContainer';

describe('LogBookContainer', () => {
  const dispatch = jest.fn();

  const recentDeleted = [
    {
      task: { title: 'task1', subTasks: [], isOpen: true },
      selfId: 1,
      parentId: 0,
    },
  ];

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockImplementation((selector) => selector({
      todo: {
        isLogBookOpen: given.isLogBookOpen,
        recentDeleted,
      },
    }));
  });

  context('when logBook is opened', () => {
    given('isLogBookOpen', () => true);

    it('renders tasks', () => {
      const { container } = render(<LogBookContainer />);

      expect(container).toHaveTextContent('# task1');
    });
  });

  context('when logBook is not opened', () => {
    given('isLogBookOpen', () => false);

    it('renders "로그 없음" button', () => {
      const { container } = render(<LogBookContainer />);

      expect(container).not.toHaveTextContent('# task1');
    });
  });
});
