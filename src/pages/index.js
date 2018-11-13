import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
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
  font-size: ${props => props.fontSize}px;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => (props.top ? `${props.top}px` : 0)};
`

const Timer = styled.h2`
  cursor: pointer;
  user-select: none;
  margin: 0;
  position: absolute;
  color: ${props => props.color};
  font-size: ${props => props.fontSize}px;
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
      timerShow: false,
      timerStart: false,
      timerId: '',
      timer: {
        color: '',
        fontSize: 32,
        modalOpen: false,
        position: {
          x: 0,
          y: 0,
        },
        value: 260,
      },
      title: {
        color: '',
        fontSize: 32,
        modalOpen: false,
        position: {
          x: 0,
          y: 0,
        },
        text: 'Starting soon',
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

  // Change timer color
  handleTimerColorUpdate = color => {
    this.setState({
      ...this.state,
      timer: {
        ...this.state.timer,
        color: color.hex,
      },
    })
  }

  // Open timer modal
  handleOpenTimerModal = () => {
    this.setState({
      ...this.state,
      timer: {
        ...this.state.timer,
        modalOpen: true,
      },
    })
  }

  // Close timer modal
  handleCloseTimerModal = () => {
    this.setState({
      ...this.state,
      timer: {
        ...this.state.timer,
        modalOpen: false,
      },
    })
  }

  // Alternative outside of state implementation
  // Start timer
  // handleStartTimer = e => {
  //   let currentTimerState = e.target.checked

  //   if (currentTimerState) {
  //     this.timerId = window.setInterval(this.handleTick, 1000)
  //   } else {
  //     if (this.timerId) {
  //       window.clearInterval(this.timerId)
  //     }
  //   }

  //   this.setState({
  //     timerStart: currentTimerState,
  //   })
  // }

  // Start timer
  handleStartTimer = e => {
    let currentTimerState = e.target.checked
    let { timerId } = this.state

    if (currentTimerState) {
      timerId = window.setInterval(this.handleTick, 1000)
    } else {
      if (timerId) {
        window.clearInterval(timerId)
      }
    }

    this.setState({
      timerStart: currentTimerState,
      timerId,
    })
  }

  // Timer tick
  handleTick = () => {
    console.log('hi')
    this.setState({
      ...this.state,
      timer: {
        ...this.state.timer,
        value: --this.state.timer.value,
      },
    })
  }

  // Convert seconds to minutes and seconds
  handleConvertTimerSeconds = totalSeconds => {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds - minutes * 60

    if (seconds == 0) {
      seconds = `00`
    } else if (seconds < 10) {
      seconds = `0${seconds}`
    }

    return `${minutes}:${seconds}`
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

  onDrop = e => {
    e.preventDefault()
    // Getting drop data
    // let id = e.dataTransfer.getData('id')
    let id = e.dataTransfer.getData('text')

    // Get mouse coords
    let x = e.clientX
    let y = e.clientY

    // TODO: Opportunity to fine tune the exact drop location
    // Calculate the correct x and y corrdinates based on the canvas size
    x = x - PADDING_OFFSET_X
    y = y - this.canvasSize.y

    this.setState({
      ...this.state,
      [id]: {
        ...this.state[id],
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
          this.handleCloseTimerModal()
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
      timer,
      timerShow,
      timerStart,
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

          {/* Timer display switch */}
          <FormControlLabel
            control={
              <Switch
                checked={timerShow}
                onChange={e => {
                  this.setState({ timerShow: e.target.checked })
                }}
                value="timerShow"
                color="primary"
              />
            }
            label="Show timer"
          />

          {/* Timer start switch */}
          <FormControlLabel
            control={
              <Switch
                checked={timerStart}
                onChange={this.handleStartTimer}
                value="timerStart"
                color="primary"
              />
            }
            label="Start timer"
          />
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
            {/* Title */}
            <Title
              onClick={this.handleOpenTitleModal}
              color={title.color}
              fontSize={title.fontSize}
              left={title.position.x}
              top={title.position.y}
              onDragStart={e => this.onDragStart(e, 'title')}
              draggable
            >
              {title.text}
            </Title>
            {/* Title config dialog */}
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
                  <TextField
                    variant="outlined"
                    label="Size"
                    value={title.fontSize}
                    onChange={this.handleChange('title', 'fontSize')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">px</InputAdornment>
                      ),
                    }}
                  />
                  <p>Color:</p>
                  <ChromePicker
                    color={title.color}
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
            {/* Timer */}
            {timerShow && (
              <>
                <Timer
                  onClick={this.handleOpenTimerModal}
                  color={timer.color}
                  fontSize={timer.fontSize}
                  left={timer.position.x}
                  top={timer.position.y}
                  onDragStart={e => this.onDragStart(e, 'timer')}
                  draggable
                >
                  {this.handleConvertTimerSeconds(timer.value)}
                </Timer>
                {/* Timer config dialog */}
                {timer.modalOpen && (
                  <StyledModal
                    aria-labelledby="timer edit dialog"
                    aria-describedby="edit timer value, color and position"
                    open={timer.modalOpen}
                    onClose={this.handleCloseTimerModal}
                  >
                    <PaperCard style={{ width: '100%' }}>
                      <TextField
                        id="timer"
                        label="Seconds"
                        value={timer.value}
                        onChange={this.handleChange('timer', 'value')}
                        // Alternative inline implementation, probably won't work when extracted out as its own component
                        // onChange={e => {
                        //   this.setState({
                        //     timer: {
                        //       ...timer,
                        //       value: e.target.value,
                        //     },
                        //   })
                        // }}
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        variant="outlined"
                        label="Size"
                        value={timer.fontSize}
                        onChange={this.handleChange('timer', 'fontSize')}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">px</InputAdornment>
                          ),
                        }}
                      />
                      <p>Color:</p>
                      <ChromePicker
                        color={timer.color}
                        onChangeComplete={this.handleTimerColorUpdate}
                      />
                      <IconButton
                        aria-label="Save changes"
                        onClick={this.handleCloseTimerModal}
                      >
                        <Check />
                      </IconButton>
                    </PaperCard>
                  </StyledModal>
                )}
              </>
            )}
          </Canvas>
        </Result>
      </Layout>
    )
  }
}

export default IndexPage
