import { useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from '../styled/ActionButton';

import LogBook from './LogBook';

export default function LogBookContainer({ initialOpen }) {
  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const [isOpen, setIsOpen] = useState(initialOpen);

  const buttonName = (isOpen) ? '로그 닫기' : '로그 열기';

  const handleClick = () => setIsOpen(!isOpen);

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
