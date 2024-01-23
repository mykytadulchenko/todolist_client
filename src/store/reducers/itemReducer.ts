import type { IAction, IItemState } from "../../types"
import { SELECT_ALL, SET_DATA, SET_FILTER } from "../actions/itemActions"

const itemState: IItemState = {
    data: [],
    filter: 'All',
    selectAll: true
}

const itemReducer = (state: IItemState = itemState, action: IAction) => {
    switch(action.type) {
        case SET_DATA:
            return {...state, data: action.payload}
        case SET_FILTER:
            return {...state, filter: action.payload}
        case SELECT_ALL:
            return {...state, data: action.payload, selectAll: !state.selectAll}
        default: return state
    }
}

export default itemReducer