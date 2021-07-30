import { gql } from '@apollo/client'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { gqlProvider, FetchType, Service } from '@app/utils/fetchers'

import actions from '../index'

import { actions as snackbarActions } from '@app/modules/snackbar'
import { PriceDistanceBonusUpdate } from '../../interface'

const PRICE_DISTANCE_BONUS_UPDATE = gql`
  mutation PriceDistanceBonusUpdate($id: BigInteger!, $request: PriceDistanceBonusRequestInput) {
    priceDistanceBonusUpdate(id: $id, request: $request)
  }
`

interface Props {
  payload: PriceDistanceBonusUpdate
}

export function* updateDistance({ payload }: Props): SagaIterator {
  const { id, request, priceBaseProfileId } = payload

  try {
    yield call(gqlProvider, FetchType.mutation, Service.cargo, PRICE_DISTANCE_BONUS_UPDATE, {
      id,
      request,
    })
    yield put(
      actions.getListDistanceActions.start({
        id: priceBaseProfileId,
        showDeleted: false,
      })
    )
    yield put(
      snackbarActions.snackbarActions.add({
        text: 'updateDistanceBonus',
        type: 'success',
      })
    )
  } catch ({ message, stackErrors }) {
    yield put(actions.updateDistanceActions.error({ message, stackErrors }))
    const messageText = stackErrors.reduce((m) => m)
    yield put(actions.createDistanceActions.error({ message, stackErrors }))
    yield put(
      snackbarActions.snackbarActions.add({ text: `distance-${messageText}`, type: 'error' })
    )
  }
}

export default function* updateDistanceSaga(): SagaIterator {
  yield takeLatest(actions.updateDistanceActions.start, updateDistance)
}
