/* eslint-disable import/no-cycle */

import { useSelector } from 'react-redux';

import SubTasks from './SubTasks';

const SubTasksContainer = ({ id }) => {
  const { isOpen, subTasks } = useSelector((state) => state.todo.tasks[id]);

  return (
    <SubTasks
      isOpen={isOpen}
      subTasks={subTasks}
    />
  );
};

export default SubTasksContainer;
