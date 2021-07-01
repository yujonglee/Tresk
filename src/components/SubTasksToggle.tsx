import { MouseEventHandler } from 'react';

import ActionButton from '../styled/ActionButton';

type SubTasksToggleType = {
  isOpen: boolean
  handleClick: MouseEventHandler<HTMLButtonElement>
};

const SubTasksToggle = ({ isOpen, handleClick }: SubTasksToggleType): JSX.Element => (
  <ActionButton
    type="button"
    onClick={handleClick}
  >
    {(isOpen) ? '접기' : '펼치기'}
  </ActionButton>
);

export default SubTasksToggle;
