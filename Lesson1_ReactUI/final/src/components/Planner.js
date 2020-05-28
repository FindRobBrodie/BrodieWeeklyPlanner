import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Week } from './Week'

export function Planner() {
  const [tasks, setTasks] = useState([])

  const handleTaskAdd = (name, dayOfWeek) => {
    let task = {name, dayOfWeek}
    let newTask = {...task, id: tasks.length + 1}
    setTasks(tasks.concat(newTask))
  }

  const handleTaskToggle = (complete, id) => {
    let newTasks = tasks.map(t => {
      if (t.id === id) {
        return {...t, complete}
      }
      else {
        return t
      }
    })
    setTasks(newTasks)
  }

  const handleTaskUpdate = (name, id) => {
    let newTasks = tasks.map(t => {
      if (t.id === id) {
        return {...t, name}
      }
      else {
        return t
      }
    })
    setTasks(newTasks)
  }

  const handleTaskDelete = (id) => {
    let newTasks = tasks.filter(t => t.id !== id)
    setTasks(newTasks)
  }

  return (
    <div>
      <Typography  variant='h4' gutterBottom>
        Brodie Weekly Planner
      </Typography>

      <Week 
        tasks={tasks}
        onTaskAdd={handleTaskAdd}
        onTaskToggle={handleTaskToggle}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
      />

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
