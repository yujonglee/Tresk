import { useSelector } from 'react-redux';

import Task from './Task';
import LogBookContainer from './LogBookContainer';

export default function Content() {
  const isLogBookOpen = useSelector((state) => state.todo.isLogBookOpen);

  return (
    (isLogBookOpen)
      ? <LogBookContainer />
      : <Task id={0} />
  );
}
