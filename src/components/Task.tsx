/* eslint-disable import/no-cycle */

import MainTask from './MainTask';
import SubTasksContainer from './SubTasksContainer';

type TaskProps = {
  id: number
};

const Task = ({ id }: TaskProps): JSX.Element => (
  <>
    <MainTask id={id} />
    <SubTasksContainer id={id} />
  </>
);
export default Task;
