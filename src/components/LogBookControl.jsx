/* eslint-disable react/jsx-props-no-spreading */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { BookRounded } from '@material-ui/icons';

import { toggleLogBookOpen } from '../redux_module/todoSlice';
import ResetLogButton from './ResetLogButton';

export default function LogBookControl({ isEmpty, isOpen }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(toggleLogBookOpen());

  const [lable, setLable] = useState('');

  useEffect(() => {
    if (isEmpty) {
      setLable('isEmpty');
      return;
    }

    setLable(
      (isOpen)
        ? 'logBookCloser'
        : 'logBookOpener',
    );
  }, [isEmpty, isOpen]);

  return (
    <>
      <IconButton
        type="button"
        aria-label={lable}
        disabled={isEmpty}
        color="secondary"
        variant="contained"
        size="small"
        onClick={handleClick}
      >
        <BookRounded />
      </IconButton>
      <ResetLogButton />
    </>
  );
}
