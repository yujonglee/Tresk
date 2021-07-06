import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';

import { updateSelectedTaskId } from '../redux_module/todoSlice';

export default function Header({ initialTaskId }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(updateSelectedTaskId(0));

  const selectedTaskId = (initialTaskId === undefined)
    ? useSelector((state) => state.todo.selectedTaskId)
    : initialTaskId;

  const isSelected = (selectedTaskId === 0);

  return (
    <header>
      <Button
        color={isSelected ? 'primary' : 'secondary'}
        onClick={handleClick}
      >
        Tresk
      </Button>
    </header>
  );
}
