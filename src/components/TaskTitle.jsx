import styled from '@emotion/styled';
import { original, highlight } from '../color';

import styles from '../styled/styles';

const TitleButton = styled.button(({ isSelected }) => ({
  ...styles.titleButton,
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
