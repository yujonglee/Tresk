import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FadeIn from 'react-fade-in';

import Header from '../components/Header';
import TitleFieldContainer from '../components/TitleFieldContainer';
import RestoreTaskButton from '../components/RestoreTaskButton';
import LogBookControlContainer from '../components/LogBookControlContainer';
import Content from '../components/Content';

const useStyles = makeStyles({
  root: {
    margin: '100px auto',
  },
});

export default function Main() {
  const classes = useStyles();

  return (
    <FadeIn delay={300}>
      <Container
        className={classes.root}
        maxWidth="md"
      >
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
            <LogBookControlContainer />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Content />
          </Grid>
        </Grid>
      </Container>
    </FadeIn>
  );
}
