import { useDispatch, useSelector } from 'react-redux';

import { selectNewTask } from '../redux_module/todoSlice';
import TaskTitle from './TaskTitle';

export default function TaskTitleContainer({ id }) {
  const dispatch = useDispatch();

  const { title } = useSelector((state) => state.todo.remainingTasks[id]);
  const selectedTaskId = useSelector((state) => state.todo.selectedTaskId);

  const isSelected = (selectedTaskId === id);

  const handleClickTitle = () => dispatch(selectNewTask(id));

  return (
    <TaskTitle
      title={title}
      isSelected={isSelected}
      handleClick={handleClickTitle}
    />
  );
}
