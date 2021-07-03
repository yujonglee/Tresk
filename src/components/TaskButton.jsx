import CompleteButton from './CompleteButton';
import SubTasksToggle from './SubTasksToggle';

export default function TaskButton({
  isSubTasksEmpty, isSubTasksOpen,
  handleClickComplete, handleClickDetail,
}) {
  return (
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
}
