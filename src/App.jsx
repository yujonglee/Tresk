import TreeCanvas from './canvas/TreeCanvas';

import TitleFieldContainer from './components/TitleFieldContainer';
import Task from './components/Task';
import Header from './components/Header';
import LogBookContainer from './components/LogBookContainer';
import RestoreTaskButton from './components/RestoreTaskButton';

export default function App() {
  return (
    <>
      <Header />
      <TitleFieldContainer />
      <RestoreTaskButton />
      <Task id={0} />
      <LogBookContainer />
      <TreeCanvas />
    </>
  );
}
