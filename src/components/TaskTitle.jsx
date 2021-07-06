import { Button, Typography } from '@material-ui/core';

export default function TaskTitle({ title, isSelected, handleClick }) {
  return (
    <Button
      type="button"
      color={isSelected ? 'primary' : 'secondary'}
      onClick={handleClick}
    >
      <Typography variant="h6">
        {title}
      </Typography>
    </Button>
  );
}
