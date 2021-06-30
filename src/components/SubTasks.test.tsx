/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import SubTasks from './SubTasks';

describe('SubTasks', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selector) => selector({
      todo: {
        tasks: {
          1: { title: 'task1', subTasks: [2, 3], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
          3: { title: 'task3', subTasks: [], isOpen: true },
        },
      },
    }));
  });

  it('renders tasks', () => {
    const { getByText } = render((
      <SubTasks
        isOpen={true}
        subTasks={[2, 3]}
      />
    ));

    expect(getByText('task2')).toBeInTheDocument();
    expect(getByText('task3')).toBeInTheDocument();
  });
});
