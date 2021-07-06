import CompleteButton from './CompleteButton';
import SubTasksToggle from './SubTasksToggle';

export default function TaskButton({
  id, isSubTasksEmpty, isSubTasksOpen,
}) {
  return (
    (isSubTasksEmpty)
      ? <CompleteButton id={id} />
      : (
        <SubTasksToggle
          id={id}
          isOpen={isSubTasksOpen}
        />
      )
  );
}
