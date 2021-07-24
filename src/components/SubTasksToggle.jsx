import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { UnfoldLessRounded, UnfoldMoreRounded } from '@material-ui/icons';

import { toggleSubTasksOpen } from '../redux_module/todoSlice';

export default function SubTasksToggle({ id, isOpen }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(toggleSubTasksOpen(id));

  const lable = (isOpen) ? 'fold' : 'unfold';
  const icon = (isOpen)
    ? <UnfoldLessRounded />
    : <UnfoldMoreRounded />;

  return (
    <>
      <IconButton
        type="button"
        aria-label={lable}
        onClick={handleClick}
      >
        {icon}
      </IconButton>
    </>
  );
}
