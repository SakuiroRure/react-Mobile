
import * as type from '../type'
let defaultState = {
    list:[]
}

const product = (state=defaultState,action={},index=0)=>{
    let editState
    let findIndex
    switch(action.type){
        case type.ADD_GROUP:
            editState = state
            findIndex = state.list.findIndex(item=>item.name==action.value.name)
            findIndex<0
                ? editState.list.push(action.value)
                : null             
            return editState
        case type.UPDATE_GROUP:
            editState = state
            editState.list[index] = action.value      
            return editState
        case type.DELETE_GROUP:
            editState = state
            editState = editState.filter(item=>item.name!==action.value)
            return editState
        default:
            return {...state}
    }
}

export default product