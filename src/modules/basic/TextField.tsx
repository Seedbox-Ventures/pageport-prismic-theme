import React from 'react'
import { TextField as MUITextField, TextFieldProps } from '@mui/material'
import styled from 'styled-components'
import { Theme, ThemeColorType } from '../../theme'
import tinycolor from 'tinycolor2'

const StyledTextField = styled(MUITextField)(({ theme }) => {
  const { mode } = theme.props
  if (mode === 'light') {
    return ''
  }
  return renderDarkStyle(theme as Theme)
})

const TextField: React.FC<TextFieldProps> = (props) => {
  return <StyledTextField {...props} />
}

export default TextField

function renderDarkStyle(theme: Theme) {
  const white = tinycolor(theme.getColorValueByType(ThemeColorType.LightText))
  const darkWhite = white.darken()
  return {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: darkWhite.toHexString(),
        borderColor: darkWhite.toHexString(),
      },
      '&:hover:not(.Mui-error) fieldset': {
        borderColor: white.toHexString(),
      },
      '&.Mui-focused:not(.Mui-error) fieldset': {
        borderColor: white.toHexString(),
      },
      '& .MuiOutlinedInput-input': {
        color: white.toHexString(),
      },
    },
    '& label': {
      '&, &.Mui-focused:not(.Mui-error)': {
        color: white.toHexString(),
      },
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiFormHelperText-root:not(.Mui-error)': {
      color: white.toHexString(),
    },
  }
}
