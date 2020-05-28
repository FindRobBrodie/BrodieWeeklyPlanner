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

export function Week() {
  return (
    <WeekStyled>
      <Day dayOfWeek='Monday' />
      <Day dayOfWeek='Tuesday' />
      <Day dayOfWeek='Wednesday' />
      <Day dayOfWeek='Thursday' />
      <Day dayOfWeek='Friday' />            
    </WeekStyled>
  )
}