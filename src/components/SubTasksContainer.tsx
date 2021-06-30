/* eslint-disable import/no-cycle */

import { useAppSelector } from '../redux_module/hook';
import SubTasks from './SubTasks';

type SubTasksContainerProps = {
  id: number
};

const SubTasksContainer = ({ id }: SubTasksContainerProps): JSX.Element => {
  const { isOpen, subTasks } = useAppSelector((state) => state.todo.tasks[id]);

  return (
    <SubTasks
      isOpen={isOpen}
      subTasks={subTasks}
    />
  );
};

export default SubTasksContainer;
