import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, TextField, Checkbox, Grid } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment'
import Add from '@material-ui/icons/Add'

const DayStyled = styled.div`
  background-color: white;
  min-height: 200px;
  font-weight: 500;
  padding: .5rem;
`

const HeaderStyled = styled.div`
  padding-bottom: .5rem;
`

const TaskInputStyled = styled.input`
  ${props => `
    text-decoration: ${props.complete ? 'line-through' : 'none'};
  `}
`

const AddIconStyled = styled(Add)`
  cursor: pointer;
`

export function Day({dayOfWeek, tasks, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  const [newTask, setNewTask] = useState('')

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
      onTaskAdd(name, dayOfWeek)
      setNewTask('')
    }
  }

  return (
    <DayStyled>

      <HeaderStyled>{dayOfWeek}</HeaderStyled>

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

    </DayStyled>
  )
}