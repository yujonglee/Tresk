import { Typography } from '@material-ui/core';

import depthCalcutaor from '../depthCalculator';

export default function LogBook({ deletedTasks }) {
  const depthInfo = depthCalcutaor(deletedTasks);

  return (
    <ul>
      {deletedTasks.map(({ task, selfId }) => (
        <li key={selfId}>
          <Typography
            color="secondary"
            variant="h6"
          >
            {'#'.repeat(depthInfo[selfId])}
            {' '}
            {task.title}
          </Typography>

        </li>
      ))}
    </ul>
  );
}
