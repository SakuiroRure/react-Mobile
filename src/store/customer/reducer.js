
import * as type from '../type'

let defaultState = {}

const customer = (state=defaultState,action={})=>{
    switch(action.type){
        case type.Customer_Edit:
            return {...action.value}
        case type.Customer_Clear:
            return defaultState
        default:
            return state;
    }
}

export default customer

