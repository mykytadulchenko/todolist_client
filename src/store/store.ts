import { StoreEnhancer, applyMiddleware, combineReducers, legacy_createStore } from "redux"
import type { IAction, IState } from "../types"
import itemReducer from "./reducers/itemReducer"
import userReducer from "./reducers/userReducer"
import type { SagaMiddleware } from "redux-saga"
import createSagaMiddleware from "redux-saga"
import { usersWatcher } from "./actions/userActions"
import { all } from "redux-saga/effects"
import { itemsWatcher } from "./actions/itemActions"

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({user: userReducer, items: itemReducer})
const store = legacy_createStore<IState, IAction, StoreEnhancer, SagaMiddleware>(rootReducer, applyMiddleware(sagaMiddleware))

function* rootWatcher() {
    yield all([usersWatcher(),itemsWatcher()])
}

sagaMiddleware.run(rootWatcher)

export default store