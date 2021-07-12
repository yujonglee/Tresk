import { useSelector } from 'react-redux';

import LogBookControl from './LogBookControl';

export default function LogBookControlContainer() {
  const isOpen = useSelector((state) => state.todo.isLogBookOpen);

  const completedTasks = useSelector((state) => state.todo.completedTasks);

  const isEmpty = (completedTasks.length === 0);

  return (
    <LogBookControl
      isEmpty={isEmpty}
      isOpen={isOpen}
    />
  );
}
