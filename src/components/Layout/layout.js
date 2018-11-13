import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import './layout.css'

import AppBar from './AppBar'
import Footer from './Footer'
import Wrapper from './Wrapper'

const Layout = ({ children, handleSaveStateToURL }) => (
  <StaticQuery
    query={graphql`
      query SiteTitle {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <AppBar handleSaveStateToURL={handleSaveStateToURL} />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout
