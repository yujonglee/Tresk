/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { BookRounded } from '@material-ui/icons';

import { toggleLogBookOpen } from '../redux_module/todoSlice';

import LogBook from './LogBook';
import ResetLogButton from './ResetLogButton';

export default function LogBookContainer() {
  const dispatch = useDispatch();

  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const isEmpty = (recentDeleted.length === 0);

  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

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
        color="primary"
        size="small"
        aria-label={lable}
        onClick={handleClick}
      >
        <BookRounded />
      </IconButton>
      <ResetLogButton />
      {(isOpen)
        ? <LogBook deletedTasks={recentDeleted} />
        : null}
    </>
  );
}
