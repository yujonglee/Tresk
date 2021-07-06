import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { CheckBoxOutlineBlankRounded } from '@material-ui/icons';

import { deleteTask } from '../redux_module/todoSlice';

export default function CompleteButton({ id }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(deleteTask(id));

  return (
    <>
      <IconButton
        type="button"
        aria-label="complete"
        onClick={handleClick}
      >
        <CheckBoxOutlineBlankRounded />
      </IconButton>
    </>
  );
}
