import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import TreeCanvas from '../canvas/TreeCanvas';

export default function Intro() {
  return (
    <>
      <TreeCanvas />
      <Link to="/app">
        <Typography
          variant="h1"
          align="center"
        >
          Tresk
        </Typography>
      </Link>
    </>
  );
}
