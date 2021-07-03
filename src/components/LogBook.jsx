import styled from '@emotion/styled';

import { original } from '../color';
import RestoreTaskButton from './RestoreTaskButton';
import depthCalcutaor from '../depthCalculator';

const DeletedItem = styled.li({
  fontSize: '1.5em',
  textDecoration: 'line-through',
  color: original,
  '&:hover': {
    fontWeight: 'bold',
  },
});

export default function LogBook({ deletedTasks }) {
  const depthInfo = depthCalcutaor(deletedTasks);

  return (
    <ul>
      {deletedTasks.map(({ task, selfId }) => (
        <div key={selfId}>
          <DeletedItem>
            {'#'.repeat(depthInfo[selfId])}
            {' '}
            {task.title}
            <RestoreTaskButton id={selfId} />
          </DeletedItem>
        </div>
      ))}
    </ul>
  );
}
