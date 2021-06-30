/* eslint-disable import/no-cycle */

import Task from './Task';

type SubTasksProps = {
  isOpen: boolean
  subTasks: number[]
};

const SubTasks = ({ isOpen, subTasks }: SubTasksProps): JSX.Element => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <ul>
      {subTasks.map((taskId) => (
        <li key={taskId}>
          <Task id={taskId} />
        </li>
      ))}
    </ul>
  );
};

export default SubTasks;
