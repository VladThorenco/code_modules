import { useDispatch, useSelector } from 'react-redux'
import { Formik, FastField, Form } from 'formik'
import { Grid } from '@material-ui/core'

import { TextInput, LoadingWrapper } from '@app/components'

import { actions } from 'modules/priceDistanceBonus/index'
import RootState from 'modules/priceDistanceBonus/interface'

import validateSchema from './validateSchema'
import useStyles from './styles'
import ActionsCreate from '../ActionsCreate'
import { Currency } from '@app/utils/constants/enums'

interface Props {
  id?: number
  item
  handleDelete
}

const CreateRow = ({ item, handleDelete }: Props): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const listLoadingRemove = useSelector(
    (state: RootState) => state.priceDistanceBonus.remove.listLoading
  )

  const initialValues = {
    bonus: '',
    distanceMin: '',
    distanceMax: '',
  }

  const onSubmit = (val): void => {
    const request = {
      bonus: parseFloat(val.bonus),
      currency: Currency.uah,
      distanceMin: parseFloat(val.distanceMin),
      distanceMax: parseFloat(val.distanceMax),
    }
    dispatch(
      actions.createDistanceActions.start({
        id: item.priceBaseProfileId,
        request,
      })
    )
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validateSchema}>
      {({ handleSubmit, handleReset }) => (
        <Form onSubmit={handleSubmit}>
          <LoadingWrapper loading={listLoadingRemove.includes(item.id)}>
            <>
              <Grid container alignItems="stretch" classes={{ container: classes.row }}>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  <FastField name="distanceMin" component={TextInput} />
                </Grid>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  <FastField name="distanceMax" component={TextInput} />
                </Grid>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  <FastField name="bonus" component={TextInput} />
                </Grid>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  <ActionsCreate
                    handleSave={() => handleSubmit()}
                    handleCancel={() => {
                      handleReset()
                      handleDelete()
                    }}
                  />
                </Grid>
              </Grid>
            </>
          </LoadingWrapper>
        </Form>
      )}
    </Formik>
  )
}

export default CreateRow
