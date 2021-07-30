import { gql } from '@apollo/client'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'
import { gqlProvider, FetchType, Service } from '@app/utils/fetchers'
import { actions as snackbarActions } from '@app/modules/snackbar'

import actions from '../index'
import { CreatePriceDistanceBonus } from '../../interface'

const CREATE_PRICE_DISTANCE = gql`
  mutation PriceDistanceBonusCreate(
    $priceBaseProfileId: BigInteger!
    $request: PriceDistanceBonusRequestInput
  ) {
    priceDistanceBonusCreate(priceBaseProfileId: $priceBaseProfileId, request: $request) {
      bonus
      currency
      distanceMax
      distanceMin
    }
  }
`

interface Props {
  payload: CreatePriceDistanceBonus
}

export function* createDistance({ payload }: Props): SagaIterator {
  const { request, id } = payload
  try {
    yield call(gqlProvider, FetchType.mutation, Service.cargo, CREATE_PRICE_DISTANCE, {
      priceBaseProfileId: id,
      request,
    })
    yield put(
      actions.getListDistanceActions.start({
        id,
        showDeleted: false,
      })
    )
    yield put(
      snackbarActions.snackbarActions.add({
        text: 'createListDistance',
        type: 'success',
      })
    )
  } catch ({ message, stackErrors }) {
    const messageText = stackErrors.reduce((m) => m)
    yield put(actions.createDistanceActions.error({ message, stackErrors }))
    yield put(
      snackbarActions.snackbarActions.add({ text: `distance-${messageText}`, type: 'error' })
    )
  }
}

export default function* createDistanceSaga(): SagaIterator {
  yield takeLatest(actions.createDistanceActions.start, createDistance)
}
