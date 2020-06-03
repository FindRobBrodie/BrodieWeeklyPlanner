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
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  task: {
    '& > *': {
      fontSize: '14px',
      color: theme.palette.grey[600],      
    },
  },
}));

const DayStyled = styled.div`
  background-color: white;
  min-height: 200px;
  font-weight: 500;
  padding: .5rem;
  &:hover { transform: scale(1.01);
`

const CheckboxStyled = styled(Checkbox)`
  margin-left: -16px;
  margin-top: -8px;
  margin-right: -16px;
`

const TaskTextFieldStyled = styled(TextField)`
  & > * {   
    ${props => `
      text-decoration: ${props.complete ? 'line-through' : 'none'};
    `}
    font-size: 14px;
  }  
`

const AddIconStyled = styled(Add)`
  cursor: pointer;
`

export function Day({date, tasks, autoFocus, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  const [newTask, setNewTask] = useState('')
  const [imgUrl, setImgUrl] = useState()
  const classes = useStyles();
  
  useEffect(() => {
    // Based on this article by Mike Heavers
    // https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
    fetch(`https://source.unsplash.com/collection/475977/480x480/?sig=${date.getDate()}`).then((response)=> {    
      setImgUrl(response.url)
    }) 
  }, [date])

  const handleTaskBlur = id => e => {
    const value = e.target.value

    if (!value) {
      onTaskDelete(id)
    }
    else {
      onTaskUpdate(value, id)
    }
  }

  const handleTaskKeyPress = id => e => {
    const value = e.target.value

    if (e.key === 'Enter') {
      if (!value) {
        onTaskDelete(id)
      }
      else {
        onTaskUpdate(value, id)
      }
      let focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      let found = false
      for (const element of focusable) {
        if (found) {
          element.focus()
          console.log(element)
          break
        }
        if (e.target === element)
          found = true;
      }

      e.preventDefault()
      return false
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
      e.preventDefault()
      return false
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
            title={format(date, 'iiii')}
          />
          <CardContent>
            <Typography variant="h5" component="h2">
              {format(date, 'iiii')}
            </Typography>
            <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
              <TodayIcon color={isToday(date) ? 'primary' : isPast(date) ? 'action' : 'disabled'}/>
              &nbsp;
              {format(date, 'M/dd')}
            </Box>
            
            {tasks.map(task => {
              return (
                <Box display="flex" key={task.id}>
                  <Box p={1}>
                    <CheckboxStyled 
                      color='primary' 
                      size="small"
                      value={task.complete}
                      onChange={e=>onTaskToggle(e.target.checked, task.id)} 
                    />
                  </Box>
                  <Box p={1} flexGrow={1}>
                    <TaskTextFieldStyled
                      className={classes.task}
                      complete={task.complete}
                      disabled={task.complete}
                      fullWidth 
                      autoComplete='false' 
                      size="small"
                      multiline  
                      defaultValue={task.name}                      
                      InputProps={{
                        disableUnderline: true,
                        
                      }}
                      inputProps={{
                        onBlur: handleTaskBlur(task.id),
                        onKeyPress: handleTaskKeyPress(task.id)
                      }}                
                    />
                  </Box>
                </Box>
              )
            })}
            
            <TextField              
              className={classes.task}
              autoComplete='false'
              autoFocus={autoFocus}
              size='small'
              fullWidth
              variant="outlined"
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
          </CardContent>          
        </Card>
      }
    </DayStyled>
  )
}