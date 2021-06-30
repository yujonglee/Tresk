import { MouseEventHandler } from 'react';

import CompleteButton from './CompleteButton';
import SubTasksToggle from './SubTasksToggle';

type TaskButtonProps = {
  id: number
  isSubTasksEmpty: boolean
  isSubTasksOpen: boolean
  handleClickComplete: MouseEventHandler<HTMLButtonElement>
  handleClickDetail: MouseEventHandler<HTMLButtonElement>
};
const TaskButton = ({
  id, isSubTasksEmpty, isSubTasksOpen, handleClickComplete, handleClickDetail,
}: TaskButtonProps): JSX.Element => (
  (isSubTasksEmpty)
    ? (
      <CompleteButton
        id={id}
        handleClick={handleClickComplete}
      />
    )
    : (
      <SubTasksToggle
        taskId={id}
        isOpen={isSubTasksOpen}
        handleClick={handleClickDetail}
      />
    )
);

export default TaskButton;
