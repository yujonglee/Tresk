import { Grid, Container } from '@material-ui/core';

import Header from '../components/Header';
import TitleFieldContainer from '../components/TitleFieldContainer';
import RestoreTaskButton from '../components/RestoreTaskButton';
import Task from '../components/Task';
import LogBookContainer from '../components/LogBookContainer';

export default function Main() {
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spaceing={6}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Header />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TitleFieldContainer />
          <RestoreTaskButton />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={8}>
          <Task id={0} />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <LogBookContainer />
        </Grid>
      </Grid>
    </Container>
  );
}
