import { AxiosError, AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import type { IAction, IListItem, IUser } from "../../types";
import axiosItemsResolver from './api/axiosResolvers/itemsResolver';
import { userActions } from './userActions';

const ASYNC_FETCH_DATA = 'ASYNC_FETCH_DATA'
const ASYNC_ADD_ITEM = 'ASYNC_ADD_ITEM'
const ASYNC_EDIT_ITEM = 'ASYNC_EDIT_ITEM'
const ASYNC_REMOVE_ITEM = 'ASYNC_REMOVE_ITEM'
const ASYNC_SELECT_ALL = 'ASYNC_SELECT_ALL'
const ASYNC_REMOVE_SELECTED = 'ASYNC_REMOVE_SELECTED'
export const SET_DATA = 'SET_DATA'
export const SET_FILTER = 'SET_FILTER'
export const SELECT_ALL = 'SELECT_ALL'
const PATH = '/api/todos'

function* workerHandler(request: any, dataAction: any = itemActions.setData):Generator<any, void, AxiosResponse> {
    const response = yield request
    if(response instanceof AxiosError && response.response!.status === 401) {
      yield put(userActions.logOut())
    } else {
      yield put(dataAction(response.data.data))
    }
}

const itemsWorkers = {
    fetchData: function* (action: IAction):Generator<any, void, AxiosResponse> {
      const { id } = action.payload
      yield workerHandler(axiosItemsResolver.get(`${ PATH }/${ id }`))
    },
    addNewItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      const { userId, value } = action.payload
      yield workerHandler(axiosItemsResolver.post(PATH, { userId, value }))
    },
    editItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      const { listItem } = action.payload
      yield workerHandler(axiosItemsResolver.patch(`${ PATH }/${ listItem.id }`, listItem))
    },
    removeItem: function* (action: IAction):Generator<any, void, AxiosResponse> {
      const { listItem } = action.payload
      yield workerHandler(axiosItemsResolver.delete(`${ PATH }/${ listItem.id }`))
    }, 
    processSelectAll: function* (action: IAction):Generator<any, void, AxiosResponse> {
      const { userId, selectAll } = action.payload
      yield workerHandler(yield axiosItemsResolver.put(`${ PATH }/bulk-select`, { userId, selectAll }), itemActions.selectAll)
    },
    processRemoveSelected: function* (action: IAction):Generator<any, void, AxiosResponse> {
        const { userId } = action.payload
        yield workerHandler(axiosItemsResolver.put(`${ PATH }/bulk-remove`, { userId }))
    }
}

export const asyncItemActions = {
  fetchData: (user: IUser) => ({ type: ASYNC_FETCH_DATA, payload: user }),
  addNewItem: (user: IUser, value: string) => ({type: ASYNC_ADD_ITEM, payload: { userId: user.id, value } }),
  editItem: (listItem: IListItem) => ({ type: ASYNC_EDIT_ITEM, payload: { listItem } }),
  removeItem: (listItem: IListItem) => ({ type: ASYNC_REMOVE_ITEM, payload: { listItem} }),
  processSelectAll: (user: IUser, selectAll: boolean) => ({ type: ASYNC_SELECT_ALL, payload: { userId: user.id, selectAll } }),
  processRemoveSelected: (user: IUser) => ({ type: ASYNC_REMOVE_SELECTED, payload: { userId: user.id} })
}

export const itemActions = {
  setData: (data: Array<IListItem>) => ({ type: SET_DATA, payload: data }),
  setFilter: (value: string) => ({ type: SET_FILTER, payload: value }),
  selectAll: (data: Array<IListItem>) => ({ type: SELECT_ALL, payload: data })
}

export function* itemsWatcher() {
  yield takeEvery(ASYNC_FETCH_DATA, itemsWorkers.fetchData)
  yield takeEvery(ASYNC_ADD_ITEM, itemsWorkers.addNewItem)
  yield takeEvery(ASYNC_EDIT_ITEM, itemsWorkers.editItem)
  yield takeEvery(ASYNC_REMOVE_ITEM, itemsWorkers.removeItem)
  yield takeEvery(ASYNC_SELECT_ALL, itemsWorkers.processSelectAll)
  yield takeEvery(ASYNC_REMOVE_SELECTED, itemsWorkers.processRemoveSelected)
}

export default asyncItemActions