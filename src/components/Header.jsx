import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { updateSelectedTaskId } from '../redux_module/todoSlice';

import { titleButtonStyle } from '../styled/styles';
import { original, highlight } from '../color';

const TitleButton = styled.button(({ isSelected }) => ({
  ...titleButtonStyle,
  fontSize: '3em',
  color: (isSelected) ? highlight : original,
}));

export default function Header({ initialTaskId }) {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(updateSelectedTaskId(0));

  const selectedTaskId = (initialTaskId === undefined)
    ? useSelector((state) => state.todo.selectedTaskId)
    : initialTaskId;

  const isSelected = (selectedTaskId === 0);

  return (
    <header>
      <TitleButton
        isSelected={isSelected}
        onClick={handleClick}
      >
        Tresk
      </TitleButton>
    </header>
  );
}
