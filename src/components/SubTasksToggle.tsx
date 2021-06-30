import { MouseEventHandler } from 'react';

import ActionButton from '../styled/ActionButton';

type SubTasksToggleType = {
  taskId: number
  isOpen: boolean
  handleClick: MouseEventHandler<HTMLButtonElement>
};

const SubTasksToggle = ({ taskId, isOpen, handleClick }: SubTasksToggleType): JSX.Element => (
  <ActionButton
    type="button"
    onClick={handleClick}
    data-testid={`button-${taskId}`}
  >
    {(isOpen) ? '접기' : '펼치기'}
  </ActionButton>
);

export default SubTasksToggle;
