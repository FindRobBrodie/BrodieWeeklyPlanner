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

export function Day({dayOfWeek}) {
  return (
    <DayStyled>

      <HeaderStyled>{dayOfWeek}</HeaderStyled>      

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
      />

    </DayStyled>
  )
}