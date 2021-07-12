/* eslint-disable import/no-cycle */

import { useSelector } from 'react-redux';

import SubTasks from './SubTasks';

export default function SubTasksContainer({ id }) {
  const { isOpen, subTasks } = useSelector((state) => state.todo.remainingTasks[id]);

  return (
    <SubTasks
      isOpen={isOpen}
      subTasks={subTasks}
    />
  );
}
