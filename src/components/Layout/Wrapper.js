import styled from 'styled-components'
import { PADDING_OFFSET_X } from '../../utils/appConfig'

const Wrapper = styled.main`
  display: grid;
  padding: ${PADDING_OFFSET_X}px;
  text-align: center;
  min-height: calc(100vh - 64px);
  background: #f2f1f0;

  @media (min-width: 1420px) {
    grid-template-columns: 1080px 1fr;
    gap: 20px;
  }
`

export default Wrapper
