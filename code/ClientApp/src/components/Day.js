import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { format, isToday, isPast } from 'date-fns'
import { Input, TextField, Checkbox, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment'
import Add from '@material-ui/icons/Add'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const DayStyled = styled.div`
  background-color: white;
  min-height: 200px;
  font-weight: 500;
  padding: .5rem;
`

const TaskInputStyled = styled.input`
  ${props => `
    text-decoration: ${props.complete ? 'line-through' : 'none'};
  `}
`

const AddIconStyled = styled(Add)`
  cursor: pointer;
`

export function Day({date, tasks, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  const [newTask, setNewTask] = useState('')
  const [imgUrl, setImgUrl] = useState()
  const classes = useStyles();
  
  useEffect(() => {
    // Based on this article by Mike Heavers
    // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
    fetch(`https://source.unsplash.com/collection/475977/480x480/?sig=${date.getDate()}`).then((response)=> {    
      setImgUrl(response.url)
    }) 
  }, [])

  const handleTaskBlur = id => e => {
    const value = e.target.value

    if (!value) {
      onTaskDelete(id)
    }
    else {
      onTaskUpdate(value, id)
    }
  }

  const handleNewTaskBlur = e => {
    addNewTask(e.target.value)
  }
  
  const handleNewTaskKeyPress = e => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        // todo: advance to next focusable item.
      }
      else {
        addNewTask(e.target.value)
      }
    }
  }
  
  const addNewTask = name => {
    if (!!name) {
      onTaskAdd(name, date)
      setNewTask('')
    }
  }

  return (
    <DayStyled>
      
      {!!imgUrl &&        
        <Card className={classes.root}>          
          <CardMedia
            className={classes.media}
            image={imgUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography  variant="h5" component="h2">
              {format(date, 'iiii')}
            </Typography>
            <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
              <TodayIcon color={isToday(date) ? 'primary' : isPast(date) ? 'action' : 'disabled'}/>
              &nbsp;
              {format(date, 'M/dd')}
            </Box>
            
            {tasks.map(task => {
              return (
                <Grid container alignItems='center' key={task.id}>
                  <Grid item>
                    <Checkbox 
                      color='primary' 
                      size="small"
                      value={task.complete}
                      onChange={e=>onTaskToggle(e.target.checked, task.id)} 
                    />
                  </Grid>
                  <Grid item>
                    <Input 
                      fullWidth 
                      size="small"
                      autoComplete='false' 
                      disableUnderline 
                      defaultValue={task.name}
                      inputComponent={TaskInputStyled}
                      inputProps={{
                        complete: task.complete,
                        onBlur: handleTaskBlur(task.id)
                      }}                
                    />
                  </Grid>
                </Grid>
              )
            })}
            
            <TextField
              autoComplete='false' 
              fullWidth
              variant="outlined"
              size="small"
              multiline
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AddIconStyled />
                  </InputAdornment>
                ),
              }}
              value={newTask}
              onChange={e=>setNewTask(e.target.value)}
              inputProps={{
                onBlur: handleNewTaskBlur,
                onKeyPress: handleNewTaskKeyPress
              }}        
            />
            <Typography variant="body2" color="textSecondary" component="p">
              use this font
            </Typography>
          </CardContent>          
        </Card>
      }
    </DayStyled>
  )
}