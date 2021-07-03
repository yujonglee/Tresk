import { useState } from 'react';
import { useSelector } from 'react-redux';
import ActionButton from '../styled/ActionButton';

import LogBook from './LogBook';

export default function LogBookContainer({ initialOpen }) {
  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const [isOpen, setIsOpen] = useState(initialOpen);
  return (
    <>
      <ActionButton
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        로그
      </ActionButton>
      {(isOpen)
        ? <LogBook deletedTasks={recentDeleted} />
        : null}
    </>
  );
}
