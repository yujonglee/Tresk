/* eslint-disable import/no-cycle */

import Task from './Task';

export default function SubTasks({ isOpen, subTasks }) {
  if (!isOpen) {
    return <></>;
  }

  return (
    <ul>
      {[...subTasks].sort().map((taskId) => (
        <li key={taskId}>
          <Task id={taskId} />
        </li>
      ))}
    </ul>
  );
}
