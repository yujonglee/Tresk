import { MouseEventHandler } from 'react';

import ActionButton from '../styled/ActionButton';

type CompleteButtonType = {
  id: number
  handleClick: MouseEventHandler<HTMLButtonElement>
};

const CompleteButton = ({ id, handleClick }: CompleteButtonType): JSX.Element => (
  <ActionButton
    type="button"
    onClick={handleClick}
    data-testid={`button-${id}`}
  >
    완료
  </ActionButton>
);

export default CompleteButton;
