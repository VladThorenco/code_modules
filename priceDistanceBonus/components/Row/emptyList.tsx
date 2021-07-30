import React from 'react'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './styles'

interface Props {
  title: string
}

const EmptyList = ({ title }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container alignItems="stretch" classes={{ container: classes.row }}>
      <Grid item xs={12} classes={{ item: classes.cell }}>
        <Typography variant="body1" align="center">
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default EmptyList
