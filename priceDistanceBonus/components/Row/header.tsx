import { Grid, Typography } from '@material-ui/core'

import useStyles from './styles'
import useTranslation from 'next-translate/useTranslation'

const Header = (): JSX.Element => {
  const { t } = useTranslation('editProfile')
  const classes = useStyles()

  return (
    <Grid container alignItems="stretch" classes={{ container: classes.row }}>
      <Grid item xs={3} classes={{ item: classes.cell }}>
        <Typography classes={{ root: classes.tableTitle }}>
          {t('header_distance_start')}{' '}
        </Typography>
      </Grid>
      <Grid item xs={3} classes={{ item: classes.cell }}>
        <Typography classes={{ root: classes.tableTitle }}> {t('header_distance_end')} </Typography>
      </Grid>
      <Grid item xs={3} classes={{ item: classes.cell }}>
        <Typography classes={{ root: classes.tableTitle }}>
          {' '}
          {t('header_price_distance')}{' '}
        </Typography>
      </Grid>
      <Grid item xs={3} classes={{ item: classes.cell }}>
        <Typography classes={{ root: classes.tableTitle }} align="center">
          {t('header_actions')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
