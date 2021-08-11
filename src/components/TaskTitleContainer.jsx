import { useSelector } from 'react-redux';

import TaskTitle from './TaskTitle';

export default function TaskTitleContainer({ id }) {
  const { title } = useSelector((state) => state.todo.remainingTasks[id]);
  const selectedTaskId = useSelector((state) => state.todo.selectedTaskId);

  const isSelected = (selectedTaskId === id);

  return (
    <TaskTitle
      title={title}
      isSelected={isSelected}
    />
  );
}
