import { IListItem } from "."

export interface IScreenComponent {
    data: Array<IListItem>
}

export interface IListItemComponent {
    key: string
    itemData: IListItem
}

export interface IFiltersComponent {
    activeCounter: number
    isAnyFinished: boolean
}

export interface ISignupForm {
    switchState: boolean
    switchForm: (a: boolean) => void
}

export interface ISigninForm extends ISignupForm {}
