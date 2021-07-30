import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles((theme) => ({
  tableTitle: {
    fontWeight: 500,
  },
  row: {
    borderBottom: `1px solid ${theme.palette.grey.A200}`,
  },
  cell: {
    padding: theme.spacing(1),
  },
}))
