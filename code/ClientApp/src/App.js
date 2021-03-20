import React from 'react'
import { Route } from 'react-router'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

import { Planner } from './components/Planner'
import { AppLayout } from '@findrobbrodie/find-rob-brodie-common'

const AppStyled = styled.div`
  padding: .5rem;
`

const PaperStyled = styled(Paper)`
  padding: 1rem;
`

export default function App() {
  return (
    <AppLayout>
      <AppStyled>
        <PaperStyled>
          <Route exact path='/' component={Planner} />
        </PaperStyled>
      </AppStyled>
    </AppLayout>
  )
}