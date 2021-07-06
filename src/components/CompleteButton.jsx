import { IconButton } from '@material-ui/core';
import { CheckBoxOutlineBlankRounded } from '@material-ui/icons';

export default function CompleteButton({ handleClick }) {
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
