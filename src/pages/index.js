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

import { PADDING_OFFSET_X } from '../utils/appConfig'

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
  position: relative;
  margin-top: 2rem;
  height: 40vh;
`

const Canvas = styled.div`
  height: 100%;
`

const Title = styled.h1`
  cursor: pointer;
  user-select: none;
  margin: 0;
  position: absolute;
  color: ${props => props.color};
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => (props.top ? `${props.top}px` : 0)};
`

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      backgroundImage:
        'http://gdj.graphicdesignjunction.com/wp-content/uploads/2014/05/003+background+pattern+designs.jpg',
      savedBackgroundImage: '',
      size: {
        width: 1,
        height: 1,
      },
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

  // Handle drag and drop
  onDragStart = (e, id) => {
    // Setting drop data
    // e.dataTransfer.setData('id', id)
    e.dataTransfer.setData('text/plain', id)
  }

  onDragOver = e => {
    e.preventDefault()
  }

  onDrop = ev => {
    // Getting drop data
    // let id = ev.dataTransfer.getData('id')
    // let id = ev.dataTransfer.getData('text')
    let x = ev.clientX
    let y = ev.clientY

    // TODO: Opportunity to fine tune the exact drop location
    // Calculate the correct x and y corrdinates based on the canvas size
    x = x - PADDING_OFFSET_X
    y = y - ev.target.parentNode.offsetTop

    this.setState({
      ...this.state,
      title: {
        ...this.state.title,
        position: {
          x,
          y,
        },
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

    // Update canvas size with the ref's dom size
    if (this.canvasSize) {
      const { width, height } = this.canvasSize

      this.setState({
        size: {
          width,
          height,
        },
      })
    }
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
        <Result
          style={style}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, 'wip')
          }}
        >
          <Canvas
            innerRef={elem =>
              (this.canvasSize = elem ? elem.getBoundingClientRect() : null)
            }
          >
            <Title
              onClick={this.handleOpenTitleModal}
              color={title.color}
              left={title.position.x}
              top={title.position.y}
              onDragStart={e => this.onDragStart(e)}
              draggable
            >
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
          </Canvas>
        </Result>
      </Layout>
    )
  }
}

export default IndexPage
