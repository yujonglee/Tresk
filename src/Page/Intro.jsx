import { Link } from 'react-router-dom';

import TreeCanvas from '../canvas/TreeCanvas';

export default function Intro() {
  return (
    <>
      <TreeCanvas />
      <Link to="/app">tresk</Link>
    </>
  );
}
