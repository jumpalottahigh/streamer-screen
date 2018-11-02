import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'

import logo from '../../assets/logo.png'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

const Brand = styled(Link)`
  &:hover {
    color: red;
    text-decoration: none;
    border-bottom: none;
  }
`

const NavLinks = styled.div`
  display: none;

  @media (min-width: 650px) {
    display: block;
  }
`

function ButtonAppBar(props) {
  const { classes } = props
  return (
    <div
      className={classes.root}
      style={{ top: 0, position: 'sticky', zIndex: 99 }}
    >
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <div className={classes.flex}>
            <Brand to="/">
              <img src={logo} style={{ height: '48px' }} alt="FPVTIPS" />
            </Brand>
          </div>
          <NavLinks>
            <Link to="/">
              <Button color="primary">Edit</Button>
            </Link>
            <Link to="/preview/">
              <Button color="primary">Preview</Button>
            </Link>
          </NavLinks>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(ButtonAppBar)
