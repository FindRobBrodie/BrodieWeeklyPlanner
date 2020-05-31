import React from 'react'
import styled from 'styled-components'
import { format, isEqual } from 'date-fns'
import { Day } from './Day'

const WeekStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2px;
  /*background-color: #CCCCCC;
  border: 2px solid #CCCCCC;*/
`

export function Week({tasks, dates, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  return (
    <WeekStyled>
      {dates.map(date => (        
        <Day 
          key={date}
          date={date}
          tasks={tasks.filter(t=>isEqual(t.date, date))} 
          onTaskAdd={onTaskAdd} 
          onTaskToggle={onTaskToggle} 
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />        
      ))}      
    </WeekStyled>
  )
}