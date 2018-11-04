import React from 'react'
import styled from 'styled-components'

import { ChromePicker } from 'react-color'

import Layout from '../components/Layout/layout'
import Grid from '../components/Layout/Grid'
import PaperCard from '../components/Layout/PaperCard'

import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'
import Image from '@material-ui/icons/Image'
import Check from '@material-ui/icons/Check'

const modalDimensions = {
  width: '360px',
  height: '500px',
}

const StyledModal = styled(Modal)`
  display: flex;
  top: calc(50% - ${modalDimensions.height} / 2) !important;
  left: calc(50% - ${modalDimensions.width} / 2) !important;
  height: ${modalDimensions.height};
  width: ${modalDimensions.width};
`

const IconLabel = styled.div`
  display: flex;

  .icon {
    font-size: 1rem;
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

const Title = styled.h1`
  cursor: pointer;
  color: ${props => props.color};
`

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundImage:
        'http://gdj.graphicdesignjunction.com/wp-content/uploads/2014/05/003+background+pattern+designs.jpg',
      savedBackgroundImage: '',
      title: {
        modalOpen: false,
        text: 'Starting soon',
        color: '',
        position: {
          x: 0,
          y: 0,
        },
      },
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
  handleChange = (node, field) => event => {
    this.setState({
      ...this.state,
      [node]: {
        ...this.state[node],
        [field]: event.target.value,
      },
    })
  }

  handleTitleColorUpdate = color => {
    this.setState({
      ...this.state,
      title: {
        ...this.state.title,
        color: color.hex,
      },
    })
  }

  // Open title modal
  handleOpenTitleModal = () => {
    this.setState({
      ...this.state,
      title: {
        ...this.state.title,
        modalOpen: true,
      },
    })
  }

  // Close title modal
  handleCloseTitleModal = () => {
    this.setState({
      ...this.state,
      title: {
        ...this.state.title,
        modalOpen: false,
      },
    })
  }

  // Handle ESC and Enter keypresses
  componentDidMount() {
    // Setup ESC and Enter listener
    document.addEventListener(
      'keydown',
      e => {
        if (e.code === 'Escape' || e.code === 'Enter') {
          this.handleCloseTitleModal()
        }
      },
      false
    )
  }

  render() {
    const { backgroundImage, savedBackgroundImage, title } = this.state

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
        <Result style={style}>
          <Title onClick={this.handleOpenTitleModal} color={title.color}>
            {title.text}
          </Title>
          {title.modalOpen && (
            <StyledModal
              aria-labelledby="title edit dialog"
              aria-describedby="edit title text, color and position"
              open={title.modalOpen}
              onClose={this.handleCloseTitleModal}
            >
              <PaperCard style={{ width: '100%' }}>
                <TextField
                  id="title"
                  label="Text"
                  value={title.text}
                  onChange={this.handleChange('title', 'text')}
                  margin="normal"
                  variant="outlined"
                />
                <ChromePicker
                  color={this.state.title.color}
                  onChangeComplete={this.handleTitleColorUpdate}
                />
                <IconButton
                  aria-label="Save changes"
                  onClick={this.handleCloseTitleModal}
                >
                  <Check />
                </IconButton>
              </PaperCard>
            </StyledModal>
          )}
        </Result>
      </Layout>
    )
  }
}

export default IndexPage
