import { Typography } from '@material-ui/core';

export default function TaskTitle({ title, isSelected }) {
  return (
    <Typography
      display="inline"
      color={isSelected ? 'primary' : 'secondary'}
      variant="h6"
    >
      {title}
    </Typography>
  );
}
