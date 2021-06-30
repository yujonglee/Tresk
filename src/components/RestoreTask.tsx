import { useDispatch } from 'react-redux';

import { restoreTask } from '../redux_module/todoSlice';
import ActionButton from '../styled/ActionButton';

const RestoreTask = (): JSX.Element => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(restoreTask());

  return (
    <ActionButton
      type="button"
      onClick={handleClick}
    >
      복구
    </ActionButton>
  );
};

export default RestoreTask;
