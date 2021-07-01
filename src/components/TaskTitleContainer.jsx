import { useDispatch, useSelector } from 'react-redux';

import { updateSelectedTaskId } from '../redux_module/todoSlice';
import TaskTitle from './TaskTitle';

const TaskTitleContainer = ({ id }) => {
  const dispatch = useDispatch();

  const { title } = useSelector((state) => state.todo.tasks[id]);
  const selectedTaskId = useSelector((state) => state.todo.selectedTaskId);

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
