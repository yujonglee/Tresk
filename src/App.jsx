/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styled from '@emotion/styled';

import TreeCanvas from './canvas/TreeCanvas';

import TitleFieldContainer from './components/TitleFieldContainer';
import Task from './components/Task';
import Header from './components/Header';
import LogBookContainer from './components/LogBookContainer';
import RestoreTaskButton from './components/RestoreTaskButton';

const Grid = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 2fr',
  gridTemplateRows: '100px 1fr 5fr',
  width: '80%',
  margin: '0 auto',
});

const FieldWapper = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 2,
  gridRowEnd: 3,
});

const TasksWapper = styled.div({
  gridColumnStart: 1,
  gridColumnEnd: 2,
  gridRowStart: 3,
  gridRowEnd: 4,
});

const LogBookWapper = styled.div({
  gridColumnStart: 2,
  gridColumnEnd: 3,
  gridRowStart: 3,
  gridRowEnd: 4,
});

const TreeWapper = styled.div({
  gridColumnStart: 3,
  gridColumnEnd: 4,
  gridRowStart: 3,
  gridRowEnd: 4,
});

export default function App() {
  return (
    <>
      <Grid>
        <FieldWapper>
          <Header />
          <TitleFieldContainer />
          <RestoreTaskButton />
        </FieldWapper>
        <TasksWapper>
          <Task id={0} />
        </TasksWapper>
        <LogBookWapper>
          <LogBookContainer />
        </LogBookWapper>
        <TreeWapper>
          <TreeCanvas />
        </TreeWapper>
      </Grid>
    </>
  );
}
