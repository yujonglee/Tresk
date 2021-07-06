import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { UndoRounded } from '@material-ui/icons';

import { restoreTask } from '../redux_module/todoSlice';

export default function RestoreTaskButton() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(restoreTask());

  return (
    <IconButton
      type="button"
      variant="contained"
      color="default"
      size="small"
      aria-label="restore"
      onClick={handleClick}
    >
      <UndoRounded />
    </IconButton>
  );
}
