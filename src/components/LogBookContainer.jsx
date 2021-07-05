import { useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from '../styled/ActionButton';

import LogBook from './LogBook';

export default function LogBookContainer({ initialOpen }) {
  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const isEmpty = (recentDeleted.length === 0);

  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleClick = () => setIsOpen(!isOpen);

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
      {(isOpen)
        ? <LogBook deletedTasks={recentDeleted} />
        : null}
    </>
  );
}
