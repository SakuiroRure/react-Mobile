
import * as type from '../type'

let defaultState = {}

const userInfo = (state=defaultState,action={})=>{
    let level
    switch(action.type){
        case type.ADD:
            level = state.level+action.value;
            return {...state,level}
        case type.MIN:
            level = state.level<=1?0:(state.level-action.value)
            return {...state,level}
        case type.User_Edit:
            return {...state,...action.value}
        default:
            return state;
    }
}

export default userInfo

