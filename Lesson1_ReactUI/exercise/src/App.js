import React from 'react'
import { Route } from 'react-router'
import { Planner } from './components/Planner'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const AppStyled = styled.div`
  padding: .5rem;
`

const PaperStyled = styled(Paper)`
  padding: 1rem;
`

export default function App() {
  return (
    <AppStyled>
      <PaperStyled>
        <Route exact path='/' component={Planner} />
      </PaperStyled>
    </AppStyled>
  )
}