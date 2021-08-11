import { useDispatch } from 'react-redux';

import { IconButton } from '@material-ui/core';
import ListDecoration from '@material-ui/icons/Remove';

import { selectNewTask } from '../redux_module/todoSlice';

export default function SelectButton({ id }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(selectNewTask(id));

  return (
    <IconButton
      type="button"
      aria-label="select"
      onClick={handleClick}
    >
      <ListDecoration />
    </IconButton>
  );
}
