import { useSelector } from 'react-redux';

import TaskButton from './TaskButton';

export default function TaskButtonContainer({ id }) {
  const { subTasks, isOpen } = useSelector((state) => state.todo.tasks[id]);

  const isSubTasksEmpty = (subTasks.length === 0);

  return (
    <TaskButton
      id={id}
      isSubTasksEmpty={isSubTasksEmpty}
      isSubTasksOpen={isOpen}
    />
  );
}
