import { useAppDispatch, useAppSelector } from './redux_module/hook';

import { updateCurrentTaskId } from './redux_module/todoSlice';
import TitleButton from './styled/TitleButton';

type HeaderProps = {
  initialTaskId?: number
};

const Header = ({ initialTaskId }: HeaderProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(updateCurrentTaskId(0));

  const currentTaskId = (initialTaskId === undefined)
    ? useAppSelector((state) => state.todo.currentTaskId)
    : initialTaskId;

  const isSelected = (currentTaskId === 0);

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
