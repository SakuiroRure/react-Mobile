import {createStore, combineReducers, applyMiddleware} from 'redux';
import userInfo from './user/reducer'       //用户信息
import catalog from './catalog/reducer'     //通讯录标签分组
import customer from './customer/reducer'   //聊天信息列表
import thunk from 'redux-thunk'

let store =  createStore(
    combineReducers({userInfo,catalog,customer}),
    applyMiddleware(thunk)
)

export default store;