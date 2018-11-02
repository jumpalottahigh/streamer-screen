import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout/layout'

class PreviewPage extends React.Component {
  render() {
    return <Layout location={this.props.location}>Preview page</Layout>
  }
}

export default PreviewPage
