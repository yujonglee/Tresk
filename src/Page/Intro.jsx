import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import FadeIn from 'react-fade-in';

import TreeCanvas from '../canvas/TreeCanvas';
import IntroIcons from '../components/IntroIcons';

export default function Intro() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <FadeIn delay={1000}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <TreeCanvas />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Button component={Link} to="/app">
            <Typography
              variant="h1"
              align="center"
            >
              Tresk
            </Typography>
          </Button>
          <IntroIcons />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography
            variant="h5"
            align="center"
          >
            Infinite Depth Todo app, Inspired By Self-Similarity
          </Typography>
        </Grid>
      </FadeIn>
    </Grid>

  );
}
