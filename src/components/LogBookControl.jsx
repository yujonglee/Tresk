/* eslint-disable react/jsx-props-no-spreading */

import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { BookRounded } from '@material-ui/icons';

import { toggleLogBookOpen } from '../redux_module/todoSlice';
import ResetLogButton from './ResetLogButton';

export default function LogBookControl({ isEmpty, isOpen }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(toggleLogBookOpen());

  const { disabled, lable } = (() => {
    if (isEmpty) {
      return {
        disabled: { disabled: true },
        lable: 'emptyLog',
      };
    }

    return {
      disabled: {},
      lable: (isOpen) ? 'closeLog' : 'openLog',
    };
  })();

  return (
    <>
      <IconButton
        {...disabled}
        type="button"
        variant="contained"
        color="secondary"
        size="small"
        aria-label={lable}
        onClick={handleClick}
      >
        <BookRounded />
      </IconButton>
      <ResetLogButton />
    </>
  );
}
