import TitleButton from '../styled/TitleButton';

const TaskTitle = ({ title, isSelected, handleClick }) => (
  <TitleButton
    type="button"
    fontSize="1.5em"
    isSelected={isSelected}
    onClick={handleClick}
  >
    {title}
  </TitleButton>
);

export default TaskTitle;
