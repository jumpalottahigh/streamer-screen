import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import './layout.css'

import Footer from './Footer'
import Wrapper from './Wrapper'

const Layout = ({ children }) => (
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
        <Wrapper>{children}</Wrapper>
        <Footer />
      </React.Fragment>
    )}
  />
)

export default Layout
