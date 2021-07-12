import { useSelector } from 'react-redux';

import LogBook from './LogBook';

export default function LogBookContainer() {
  const completedTasks = useSelector((state) => state.todo.completedTasks);

  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

  return (
    (isOpen)
      ? <LogBook deletedTasks={completedTasks} />
      : null
  );
}
