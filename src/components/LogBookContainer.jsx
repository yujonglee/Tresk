import { useDispatch, useSelector } from 'react-redux';

import { toggleLogBookOpen } from '../redux_module/todoSlice';
import ActionButton from '../styled/ActionButton';
import LogBook from './LogBook';
import ResetLogButton from './ResetLogButton';

export default function LogBookContainer() {
  const dispatch = useDispatch();

  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const isEmpty = (recentDeleted.length === 0);

  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

  const handleClick = () => dispatch(toggleLogBookOpen());

  const buttonName = (() => {
    if (isEmpty) {
      return '로그 없음';
    }

    return (isOpen) ? '로그 닫기' : '로그 열기';
  })();

  return (
    <>
      <ActionButton
        type="button"
        onClick={handleClick}
      >
        {buttonName}
      </ActionButton>
      <ResetLogButton />
      {(isOpen)
        ? <LogBook deletedTasks={recentDeleted} />
        : null}
    </>
  );
}
