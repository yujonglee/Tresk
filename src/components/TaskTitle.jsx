import { Button } from '@material-ui/core';

export default function TaskTitle({ title, isSelected, handleClick }) {
  return (
    <Button
      type="button"
      color={isSelected ? 'primary' : 'secondary'}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
}
