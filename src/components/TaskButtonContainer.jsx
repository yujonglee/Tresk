import { useDispatch, useSelector } from 'react-redux';

import { deleteTask, toggleOpen } from '../redux_module/todoSlice';
import TaskButton from './TaskButton';

const TaskButtonContainer = ({ id }) => {
  const dispatch = useDispatch();

  const { subTasks, isOpen } = useSelector((state) => state.todo.tasks[id]);

  const isSubTasksEmpty = (subTasks.length === 0);

  const handleClickComplete = () => dispatch(deleteTask(id));
  const handleClickDetail = () => dispatch(toggleOpen(id));

  return (
    <TaskButton
      isSubTasksEmpty={isSubTasksEmpty}
      isSubTasksOpen={isOpen}
      handleClickComplete={handleClickComplete}
      handleClickDetail={handleClickDetail}
    />
  );
};

export default TaskButtonContainer;
