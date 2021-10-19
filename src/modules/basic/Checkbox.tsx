import React from 'react'
import { Checkbox as MUICheckbox, CheckboxProps } from '@mui/material'
import styled from 'styled-components'
import { Theme, ThemeColorType } from '../../theme'
import tinycolor from 'tinycolor2'

const StyledCheckbox = styled(MUICheckbox)(({ theme }) => {
  const { mode } = theme.props
  if (mode === 'light') {
    return ''
  }
  return renderDarkStyle(theme as Theme)
})

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <StyledCheckbox {...props} />
}

export default Checkbox

function renderDarkStyle(theme: Theme) {
  const white = tinycolor(theme.getColorValueByType(ThemeColorType.LightText))

  return `
    &.MuiCheckbox-root {
      .MuiSvgIcon-root {
        fill: ${white.toHexString()};
      }
    }
    
  `
}
