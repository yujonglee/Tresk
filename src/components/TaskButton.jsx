import CompleteButton from './CompleteButton';
import SubTasksToggle from './SubTasksToggle';

const TaskButton = ({
  isSubTasksEmpty, isSubTasksOpen,
  handleClickComplete, handleClickDetail,
}) => (
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
