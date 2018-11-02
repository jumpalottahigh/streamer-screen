import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout/layout'
import Grid from '../components/Layout/Grid'
import PaperCard from '../components/Layout/PaperCard'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
// import AddBox from '@material-ui/icons/AddBox'
import Clear from '@material-ui/icons/Clear'
import Image from '@material-ui/icons/Image'
import Check from '@material-ui/icons/Check'

const IconLabel = styled.div`
  display: flex;

  .icon {
    margin-right: 0.5rem;
  }

  .text {
  }
`

const UploadedLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  color: forestgreen;

  .uploaded-link__clear {
    font-size: 1.2rem;
    cursor: pointer;
    color: #000;
  }
`

const Result = styled(PaperCard)`
  margin-top: 2rem;
  min-height: 40vh;
`

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundImage: '',
      savedBackgroundImage: '',
    }
  }

  // Set background
  setBackground = () => {
    console.log('set background')
    // Actually set teh background
    this.setState({
      savedBackgroundImage: this.state.backgroundImage,
      backgroundImage: '',
    })
  }

  // Update input on change
  handleChange = name => event => {
    this.setState({
      ...this.state,
      [name]: event.target.value,
    })
  }

  render() {
    const { backgroundImage, savedBackgroundImage } = this.state

    // Construct styles for the Layout container
    let style = {
      backgroundImage: `url(${savedBackgroundImage})`,
    }

    return (
      <Layout location={this.props.location}>
        {/* CONTROLS */}
        <Grid>
          {/* Background image */}
          <PaperCard>
            <TextField
              id="backgroundImage"
              label={
                <IconLabel>
                  <Image className="icon" />{' '}
                  <span className="text">Background Image</span>
                </IconLabel>
              }
              value={backgroundImage}
              onChange={this.handleChange('backgroundImage')}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Set background"
                      onClick={this.setBackground}
                    >
                      <Check />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {savedBackgroundImage && (
              <UploadedLink>
                {savedBackgroundImage}{' '}
                <Clear
                  className="uploaded-link__clear"
                  onClick={() => {
                    this.setState({ savedBackgroundImage: '' })
                  }}
                />
              </UploadedLink>
            )}
          </PaperCard>
        </Grid>

        {/* RESULT */}
        <Result style={style}>Result</Result>
      </Layout>
    )
  }
}

export default IndexPage
