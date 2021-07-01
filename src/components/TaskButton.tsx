import { MouseEventHandler } from 'react';

import CompleteButton from './CompleteButton';
import SubTasksToggle from './SubTasksToggle';

type TaskButtonProps = {
  isSubTasksEmpty: boolean
  isSubTasksOpen: boolean
  handleClickComplete: MouseEventHandler<HTMLButtonElement>
  handleClickDetail: MouseEventHandler<HTMLButtonElement>
};

const TaskButton = ({
  isSubTasksEmpty, isSubTasksOpen,
  handleClickComplete, handleClickDetail,
}: TaskButtonProps): JSX.Element => (
  (isSubTasksEmpty)
    ? (
      <CompleteButton
        handleClick={handleClickComplete}
      />
    )
    : (
      <SubTasksToggle
        isOpen={isSubTasksOpen}
        handleClick={handleClickDetail}
      />
    )
);

export default TaskButton;
