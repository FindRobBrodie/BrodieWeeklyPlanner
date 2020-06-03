import React from 'react'
import styled from 'styled-components'
import { isEqual } from 'date-fns'
import { Day } from './Day'

const WeekStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 2px;
  /*background-color: #CCCCCC;
  border: 2px solid #CCCCCC;*/
`

export function Week({tasks, dates, onTaskAdd, onTaskToggle, onTaskUpdate, onTaskDelete}) {
  return (
    <WeekStyled>
      {dates.map((date, index) => (        
        <Day 
          key={date}
          date={date}
          tasks={tasks.filter(t=>isEqual(t.date, date))} 
          autoFocus={index===0}
          onTaskAdd={onTaskAdd} 
          onTaskToggle={onTaskToggle} 
          onTaskUpdate={onTaskUpdate}
          onTaskDelete={onTaskDelete}
        />        
      ))}      
    </WeekStyled>
  )
}