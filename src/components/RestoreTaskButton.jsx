import { useDispatch } from 'react-redux';

import { restoreTask } from '../redux_module/todoSlice';
import ActionButton from '../styled/ActionButton';

export default function RestoreTaskButton() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(restoreTask());

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      되돌리기
    </ActionButton>
  );
}
