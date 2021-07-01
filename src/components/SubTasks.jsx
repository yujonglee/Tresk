/* eslint-disable import/no-cycle */

import Task from './Task';

const SubTasks = ({ isOpen, subTasks }) => {
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
