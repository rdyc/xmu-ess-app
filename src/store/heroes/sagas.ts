import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { HeroesActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import callApi from '../../utils/api'

const API_ENDPOINT = process.env.REACT_APP_API_URL || ''

function* handleFetch() {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, '/v1/project/registrations')

    if (res.error) {
      console.log(res)
      yield put(fetchError(res.error))
    } else {
      console.log(res)
      yield put(fetchSuccess(res.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(HeroesActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* heroesSaga() {
  yield all([fork(watchFetchRequest)])
}

export default heroesSaga
