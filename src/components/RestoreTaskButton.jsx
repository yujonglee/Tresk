import { useDispatch } from 'react-redux';

import { restoreTask } from '../redux_module/todoSlice';
import ActionButton from '../styled/ActionButton';

export default function RestoreTaskButton({ id }) {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(restoreTask(id));

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      복구
    </ActionButton>
  );
}
