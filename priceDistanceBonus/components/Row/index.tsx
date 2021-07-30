import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, FastField, Form } from 'formik'
import { Grid, ThemeProvider, Typography } from '@material-ui/core'

import { TextInput, LoadingWrapper } from '@app/components'
import { Currency } from '@app/utils/constants/enums'

import { actions } from 'modules/priceDistanceBonus/index'
import RootState, { PriceDistanceBonus } from 'modules/priceDistanceBonus/interface'
import RootStateProfile from 'modules/priceProfiles/interface'
import DeleteModal from '../Actions/deleteModal'
import Actions from '../Actions'

import validateSchema from './validateSchema'
import useStyles from './styles'
import deleteModalTheme from 'modules/priceDistanceBonus/theme/deleteModalTheme'

interface Props {
  item: PriceDistanceBonus
  handleDelete: () => void
}

const Row = ({ item, handleDelete }: Props): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const dataProfile = useSelector(
    (state: RootStateProfile) => state.priceProfiles.getSingleProfile.items
  )

  const [edit, setEdit] = useState<boolean>(false)

  const listLoadingRemove = useSelector(
    (state: RootState) => state.priceDistanceBonus.remove.listLoading
  )

  const initialValues = {
    bonus: item.bonus,
    distanceMin: item.distanceMin,
    distanceMax: item.distanceMax,
  }

  const onSubmitProfile = (val): void => {
    const request = {
      bonus: parseFloat(val.bonus),
      currency: Currency.uah,
      distanceMin: parseFloat(val.distanceMin),
      distanceMax: parseFloat(val.distanceMax),
    }
    dispatch(
      actions.updateDistanceActions.start({
        id: item.id,
        priceBaseProfileId: dataProfile.id,
        request,
      })
    )
  }

  const deleteItem = (): void => {
    handleDelete()
    setOpenDeleteModal(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitProfile}
      validationSchema={validateSchema}
    >
      {({ handleSubmit, handleReset }) => (
        <Form onSubmit={handleSubmit}>
          <LoadingWrapper loading={listLoadingRemove.includes(item.id)}>
            <>
              <Grid container alignItems="stretch" classes={{ container: classes.row }}>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  {edit ? (
                    <FastField name="distanceMin" component={TextInput} />
                  ) : (
                    <Typography>{item.distanceMin}</Typography>
                  )}
                </Grid>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  {edit ? (
                    <FastField name="distanceMax" component={TextInput} />
                  ) : (
                    <Typography>{item.distanceMax}</Typography>
                  )}
                </Grid>
                <Grid item container alignItems="center" xs={3} classes={{ item: classes.cell }}>
                  {edit ? (
                    <FastField name="bonus" component={TextInput} />
                  ) : (
                    <Typography>{item.bonus}</Typography>
                  )}
                </Grid>
                <Grid item container alignItems="center" xs={2} classes={{ item: classes.cell }}>
                  <Actions
                    edit={edit}
                    handleEdit={() => setEdit(true)}
                    onHandleDelete={() => setOpenDeleteModal(true)}
                    handleSave={handleSubmit}
                    handleCancel={() => {
                      handleReset()
                      setEdit(false)
                    }}
                  />
                </Grid>
              </Grid>
              <ThemeProvider theme={deleteModalTheme}>
                <DeleteModal
                  open={openDeleteModal}
                  handleClose={() => setOpenDeleteModal(false)}
                  handleDelete={deleteItem}
                />
              </ThemeProvider>
            </>
          </LoadingWrapper>
        </Form>
      )}
    </Formik>
  )
}

export default Row
