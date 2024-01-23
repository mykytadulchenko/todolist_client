export interface IListItem {
    id: string;
    value: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface IUserState {
    isAuth: boolean
    currentUser: IUser | null
    token: string | null
}

export interface IItemState {
    data: Array<IListItem>
    filter: string
    selectAll: boolean
}

export interface IState {
    items: IItemState
    user: IUserState
}

export interface IAction {
    type: string
    payload?: any
}

export interface ISignin {
    login: string
    password: string
}

export interface ISignup extends ISignin {
    email: string
    passwordConfirm: string
}

export interface IUser {
    id?: string
    login: string
    email?: string
    password?: string
    token?: string
}
