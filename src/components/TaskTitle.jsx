import styled from '@emotion/styled';
import { original, highlight } from '../color';

import { titleButtonStyle } from '../styled/styles';

const TitleButton = styled.button(({ isSelected }) => ({
  ...titleButtonStyle,
  fontSize: '1.5em',
  color: (isSelected) ? highlight : original,
}));

export default function TaskTitle({ title, isSelected, handleClick }) {
  return (
    <TitleButton
      type="button"
      isSelected={isSelected}
      onClick={handleClick}
    >
      {title}
    </TitleButton>
  );
}
