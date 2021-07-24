import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@material-ui/core';

import { selectNewTask } from '../redux_module/todoSlice';

export default function Header({ initialTaskId }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(selectNewTask(0));

  const selectedTaskId = initialTaskId ?? useSelector(
    (state) => state.todo.selectedTaskId,
  );

  const isSelected = (selectedTaskId === 0);

  return (
    <header>
      <Button
        color={isSelected ? 'primary' : 'secondary'}
        onClick={handleClick}
      >
        <Typography variant="h2">
          Tresk
        </Typography>
      </Button>
    </header>
  );
}
