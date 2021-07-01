import { useDispatch, useSelector } from 'react-redux';

import { updateSelectedTaskId } from '../redux_module/todoSlice';
import TitleButton from '../styled/TitleButton';

const Header = ({ initialTaskId }) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(updateSelectedTaskId(0));

  const selectedTaskId = (initialTaskId === undefined)
    ? useSelector((state) => state.todo.selectedTaskId)
    : initialTaskId;

  const isSelected = (selectedTaskId === 0);

  return (
    <header>
      <TitleButton
        fontSize="3em"
        isSelected={isSelected}
        onClick={handleClick}
      >
        Tresk
      </TitleButton>
    </header>
  );
};

export default Header;
