import { useSelector } from 'react-redux';

import LogBookControl from './LogBookControl';

export default function LogBookControlContainer() {
  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const isEmpty = (recentDeleted.length === 0);

  return (
    <LogBookControl
      isEmpty={isEmpty}
      isOpen={isOpen}
    />
  );
}
