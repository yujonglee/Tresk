import { useDispatch } from 'react-redux';

import ActionButton from '../styled/ActionButton';
import { resetRecentDeleted } from '../redux_module/todoSlice';

export default function ResetLogButton() {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(resetRecentDeleted());

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      초기화
    </ActionButton>
  );
}
