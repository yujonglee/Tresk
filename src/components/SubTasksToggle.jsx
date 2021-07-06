import { IconButton } from '@material-ui/core';
import { UnfoldLessRounded, UnfoldMoreRounded } from '@material-ui/icons';

export default function SubTasksToggle({ isOpen, handleClick }) {
  const lable = (isOpen) ? 'fold' : 'unfold';

  return (
    <>
      <IconButton
        type="button"
        aria-label={lable}
        onClick={handleClick}
      >
        {(isOpen)
          ? <UnfoldLessRounded />
          : <UnfoldMoreRounded />}
      </IconButton>
    </>
  );
}
