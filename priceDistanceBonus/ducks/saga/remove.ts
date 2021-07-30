import { gql } from '@apollo/client'
import { takeLatest, call, put } from 'redux-saga/effects'
import { SagaIterator } from '@redux-saga/core'

import { gqlProvider, FetchType, Service } from '@app/utils/fetchers'
import { actions as snackbarActions } from '@app/modules/snackbar'
import actions from '../index'
import { PriceDistanceBonusRemove } from '../../interface'

const PRICE_DISTANCE_BONUS_DELETE = gql`
  mutation PriceDistanceBonusDelete($id: BigInteger!) {
    priceDistanceBonusDelete(id: $id)
  }
`

interface Props {
  payload: PriceDistanceBonusRemove
}

export function* removeDistance({ payload }: Props): SagaIterator {
  const { id, priceBaseProfileId } = payload
  try {
    yield call(gqlProvider, FetchType.mutation, Service.cargo, PRICE_DISTANCE_BONUS_DELETE, {
      id,
    })

    yield put(actions.removeDistanceActions.end({ id }))
    yield put(
      actions.getListDistanceActions.start({
        id: priceBaseProfileId,
        showDeleted: false,
      })
    )
    yield put(
      snackbarActions.snackbarActions.add({
        text: 'removeDistance',
        type: 'success',
      })
    )
  } catch ({ message, stackErrors }) {
    yield put(actions.removeDistanceActions.error({ message, stackErrors, id }))
  }
}

export default function* removeDistanceSaga(): SagaIterator {
  yield takeLatest(actions.removeDistanceActions.start, removeDistance)
}
