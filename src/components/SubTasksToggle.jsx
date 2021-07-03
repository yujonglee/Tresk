import ActionButton from '../styled/ActionButton';

export default function SubTasksToggle({ isOpen, handleClick }) {
  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      {(isOpen) ? '접기' : '펼치기'}
    </ActionButton>
  );
}
