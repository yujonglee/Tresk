import { MouseEventHandler } from 'react';

import ActionButton from '../styled/ActionButton';

type CompleteButtonType = {
  handleClick: MouseEventHandler<HTMLButtonElement>
};

const CompleteButton = ({ handleClick }: CompleteButtonType): JSX.Element => (
  <ActionButton
    type="button"
    onClick={handleClick}
  >
    완료
  </ActionButton>
);

export default CompleteButton;
