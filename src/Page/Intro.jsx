import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { Grid, Typography, Button } from '@material-ui/core';

import TreeCanvas from '../canvas/TreeCanvas';

export default function Intro() {
  return (

    <Grid
      container
      direction="row"
      justify="center"
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
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography
            variant="body1"
            align="center"
          >
            Infinite Depth Todo app, Inspired By Self-Similarity
          </Typography>
        </Grid>
      </FadeIn>
    </Grid>

  );
}
