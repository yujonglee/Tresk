/* eslint-disable import/no-cycle */

import MainTask from './MainTask';
import SubTasksContainer from './SubTasksContainer';

const Task = ({ id }) => {
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
