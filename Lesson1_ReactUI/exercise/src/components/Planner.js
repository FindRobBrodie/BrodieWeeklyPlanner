import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Week } from './Week'

export function Planner() {
  return (
    <div>
      <Typography  variant='h4' gutterBottom>
        Brodie Weekly Planner
      </Typography>

      <Week />

      &nbsp;

      <Grid container justify="space-between">
        <Grid item>
          <Button variant="outlined" color="primary">
            Previous week
          </Button>
        </Grid>
        
        <Grid item>
          <Button variant="outlined" color="primary">
            Next week
          </Button>
        </Grid>
      </Grid>

    </div>
  );
}
