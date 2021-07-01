import TitleButton from '../styled/TitleButton';

export default function TaskTitle({ title, isSelected, handleClick }) {
  return (
    <TitleButton
      type="button"
      fontSize="1.5em"
      isSelected={isSelected}
      onClick={handleClick}
    >
      {title}
    </TitleButton>
  );
}
