import styled from '@emotion/styled';

import { original, highlight } from '../fixture/color';

type ButtonProps = {
  isSelected: boolean
  fontSize: string
};

const TitleButton = styled.button<ButtonProps>(({ isSelected, fontSize }) => ({
  fontSize,
  border: 0,
  color: (isSelected) ? highlight : original,
  textDecoration: 'none',
  background: 'transparent',
  marginBottom: 8,
  '&:hover': {
    fontWeight: 'bold',
  },
}));

export default TitleButton;
