import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeStyle } from '@app/utils/constants/enums'

export default createMuiTheme({
  palette: {
    type: ThemeStyle.light,
    secondary: {
      dark: '#c51162',
      light: '#fff',
      main: '#f50057',
    },
  },
})
