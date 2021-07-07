import { useSelector } from 'react-redux';

import LogBook from './LogBook';

export default function LogBookContainer() {
  const recentDeleted = useSelector((state) => state.todo.recentDeleted);

  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

  return (
    (isOpen)
      ? <LogBook deletedTasks={recentDeleted} />
      : null
  );
}
