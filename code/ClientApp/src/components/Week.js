import React from 'react'
import styled from 'styled-components'
import { Day } from './Day'

const WeekStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2px;
  background-color: #CCCCCC;
  border: 2px solid #CCCCCC;
`

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export function Week({tasks, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  return (
    <WeekStyled>
      {daysOfWeek.map(dayOfWeek => (
        <Day 
          key={dayOfWeek}
          dayOfWeek={dayOfWeek}
          tasks={tasks.filter(t=>t.dayOfWeek===dayOfWeek)} 
          onTaskAdd={onTaskAdd} 
          onTaskToggle={onTaskToggle} 
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />
      ))}      
    </WeekStyled>
  )
}