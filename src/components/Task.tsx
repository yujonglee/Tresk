/* eslint-disable import/no-cycle */

import MainTask from './MainTask';
import SubTasksContainer from './SubTasksContainer';

type TaskProps = {
  id: number
};

const Task = ({ id }: TaskProps): JSX.Element => {
  const isRootTask = (id === 0);

  return (
    <>
      {isRootTask
        ? null
        : <MainTask id={id} />}

      <SubTasksContainer id={id} />
    </>
  );
};

export default Task;
