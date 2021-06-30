import { useAppDispatch, useAppSelector } from '../redux_module/hook';
import { updateCurrentTaskId } from '../redux_module/todoSlice';
import TaskTitle from './TaskTitle';

type TaskTitleContainerProps = {
  id: number
};

const TaskTitleContainer = ({ id }: TaskTitleContainerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { title } = useAppSelector((state) => state.todo.tasks[id]);
  const currentTaskId = useAppSelector((state) => state.todo.currentTaskId);

  const isSelected = (currentTaskId === id);

  const handleClickTitle = () => dispatch(updateCurrentTaskId(id));

  return (
    <TaskTitle
      title={title}
      isSelected={isSelected}
      handleClick={handleClickTitle}
    />
  );
};

export default TaskTitleContainer;
