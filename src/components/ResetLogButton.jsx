import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';

import { RotateLeftRounded } from '@material-ui/icons';
import { emptyCompletedTasks } from '../redux_module/todoSlice';

export default function ResetLogButton() {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(emptyCompletedTasks());

  return (
    <IconButton
      type="button"
      variant="contained"
      color="default"
      size="small"
      aria-label="resetLog"
      onClick={handleClick}
    >
      <RotateLeftRounded />
    </IconButton>
  );
}
