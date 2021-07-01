import { useAppDispatch, useAppSelector } from '../redux_module/hook';
import { updateSelectedTaskId } from '../redux_module/todoSlice';
import TaskTitle from './TaskTitle';

type TaskTitleContainerProps = {
  id: number
};

const TaskTitleContainer = ({ id }: TaskTitleContainerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { title } = useAppSelector((state) => state.todo.tasks[id]);
  const selectedTaskId = useAppSelector((state) => state.todo.selectedTaskId);

  const isSelected = (selectedTaskId === id);

  const handleClickTitle = () => dispatch(updateSelectedTaskId(id));

  return (
    <TaskTitle
      title={title}
      isSelected={isSelected}
      handleClick={handleClickTitle}
    />
  );
};

export default TaskTitleContainer;
