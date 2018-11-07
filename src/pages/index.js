import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'
import Image from '@material-ui/icons/Image'
import React from 'react'
import { ChromePicker } from 'react-color'
import styled from 'styled-components'
import Grid from '../components/Layout/Grid'
import Layout from '../components/Layout/layout'
import PaperCard from '../components/PaperCard'
import Particles from '../components/Particles'
import { PADDING_OFFSET_X, ParticlesConfig } from '../utils/appConfig'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'

const BACKGROUND_EFFECTS_OPTIONS = Object.keys(ParticlesConfig)

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
  background-color: ${props =>
    props.backgroundcolor ? `${props.backgroundcolor}!important` : ``};
  background-image: ${props =>
    props.backgroundimage ? `url(${props.backgroundimage})` : ``};
`

const Canvas = styled.div`
  height: 100%;
  overflow: hidden;

  canvas {
    height: 100%;
    max-height: 100% !important;
  }
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
      backgroundColor: '#fff',
      backgroundImage:
        'http://gdj.graphicdesignjunction.com/wp-content/uploads/2014/05/003+background+pattern+designs.jpg',
      savedBackgroundImage: '',
      backgroundEffect: '',
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

  // Change background effects
  handleBackgroundEffectUpdate = e => {
    let effectName = e.target.value

    this.setState({
      ...this.state,
      backgroundEffect: effectName,
    })
  }

  // Change background color
  handleBackgroundColorUpdate = color => {
    this.setState({
      ...this.state,
      backgroundColor: color.hex,
    })
  }

  // Change title color
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
    ev.preventDefault()
    // Getting drop data
    // let id = ev.dataTransfer.getData('id')
    // let id = ev.dataTransfer.getData('text')
    let x = ev.clientX
    let y = ev.clientY

    // TODO: Opportunity to fine tune the exact drop location
    // Calculate the correct x and y corrdinates based on the canvas size
    x = x - PADDING_OFFSET_X
    y = y - this.canvasSize.y

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
    const {
      backgroundColor,
      backgroundImage,
      savedBackgroundImage,
      backgroundEffect,
      title,
    } = this.state

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

          {/* Background color */}
          <ChromePicker
            color={backgroundColor}
            onChangeComplete={this.handleBackgroundColorUpdate}
          />

          {/* Background effect */}
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-background-effect">
              Background effect
            </InputLabel>
            <Select
              value={backgroundEffect}
              onChange={this.handleBackgroundEffectUpdate}
              input={
                <OutlinedInput
                  labelWidth={144}
                  id="outlined-background-effect"
                />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {BACKGROUND_EFFECTS_OPTIONS.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option[0].toUpperCase()}
                  {option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* RESULT */}
        <Result
          backgroundimage={savedBackgroundImage}
          backgroundcolor={backgroundColor}
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e)
          }}
        >
          <Canvas
            innerRef={elem =>
              (this.canvasSize = elem ? elem.getBoundingClientRect() : null)
            }
          >
            {/* Particles.js background effects */}
            {backgroundEffect && (
              <Particles params={ParticlesConfig[backgroundEffect]} />
            )}
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
