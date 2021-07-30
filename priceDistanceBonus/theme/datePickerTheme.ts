import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeStyle } from '@app/utils/constants/enums'

export default createMuiTheme({
  palette: {
    type: ThemeStyle.light,
    primary: {
      main: '#3f51b5', // background circle
      light: '#3f51b5',
      dark: '#303f9f',
      contrastText: '#687bec', // color range date
    },
    secondary: {
      dark: '#fff', // border date
      light: '#fff',
      main: '#202026', // color
      contrastText: '#fff',
    },
  },
})
