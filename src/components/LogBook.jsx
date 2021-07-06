import styled from '@emotion/styled';

import palette from '../color';
import depthCalcutaor from '../depthCalculator';

const DeletedItem = styled.li({
  fontSize: '1.5em',
  textDecoration: 'line-through',
  color: palette.secondary.main,
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
          </DeletedItem>
        </div>
      ))}
    </ul>
  );
}
