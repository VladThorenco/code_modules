import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import Header from '../Row/header'
import CreateRow from '../Row/createRow'
import Row from '../Row'
import { useDispatch, useSelector } from 'react-redux'
import RootState from 'modules/priceDistanceBonus/interface'
import actions from 'modules/priceDistanceBonus/ducks'
import useStyles from '../../../priceProfiles/components/Form/styles'
import useTranslation from 'next-translate/useTranslation'
import EmptyList from '../emptyList'

interface Props {
  dataProfile?: any
}

const TableDistancePrice = ({ dataProfile }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const [createRow, setCreateRow] = useState(false)
  const classes = useStyles()
  const { t } = useTranslation('editProfile')
  const { list, loading } = useSelector((state: RootState) => state.priceDistanceBonus.getList)

  const currentDate = new Date()

  const defaultRow = {
    id: 0,
    priceBaseProfileId: dataProfile?.id,
    basePrice: '',
    validityEnd: currentDate.toISOString(),
    validityStart: currentDate.toISOString(),
  }

  const handleRemove = (item): void => {
    dispatch(
      actions.removeDistanceActions.start({
        id: item.id,
        priceBaseProfileId: dataProfile.id,
      })
    )
  }

  useEffect(() => {
    dispatch(
      actions.getListDistanceActions.start({
        id: dataProfile.id,
        showDeleted: false,
      })
    )
    return () => {
      dispatch(actions.getListDistanceActions.clear())
    }
  }, [])

  if (loading) return <CircularProgress />

  return (
    <Grid item xs={12}>
      <Grid
        container
        alignItems={'center'}
        justify={'space-between'}
        className={classes.wrapTitleHeader}
      >
        <Grid item>
          <Typography variant={'h6'}>{t('title_distance')}</Typography>
        </Grid>
        <Grid item>
          {!createRow && (
            <Button variant="contained" color="primary" onClick={() => setCreateRow(true)}>
              {t('forms:buttonAdd')}
            </Button>
          )}
        </Grid>
      </Grid>
      <Header />
      {createRow ? <CreateRow item={defaultRow} handleDelete={() => setCreateRow(false)} /> : null}
      {list.length > 0 ? (
        list.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Row item={item} handleDelete={() => handleRemove(item)} />
          </Grid>
        ))
      ) : (
        <EmptyList title={t('empty_list')} />
      )}
    </Grid>
  )
}

export default TableDistancePrice
