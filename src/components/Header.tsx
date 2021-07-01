import { useAppDispatch, useAppSelector } from '../redux_module/hook';

import { updateSelectedTaskId } from '../redux_module/todoSlice';
import TitleButton from '../styled/TitleButton';

type HeaderProps = {
  initialTaskId?: number
};

const Header = ({ initialTaskId }: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(updateSelectedTaskId(0));

  const selectedTaskId = (initialTaskId === undefined)
    ? useAppSelector((state) => state.todo.selectedTaskId)
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
