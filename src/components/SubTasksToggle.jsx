import ActionButton from '../styled/ActionButton';

const SubTasksToggle = ({ isOpen, handleClick }) => (
  <ActionButton
    type="button"
    onClick={handleClick}
  >
    {(isOpen) ? '접기' : '펼치기'}
  </ActionButton>
);

export default SubTasksToggle;
