import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restore: {
    color: theme.palette.primary.main,
  },
  save: {
    color: theme.palette.success.main,
  },
  cancel: {
    color: theme.palette.warning.main,
  },
  edit: {
    color: theme.palette.primary.main,
  },
  delete: {
    color: theme.palette.error.main,
  },
}))
