import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../pages/home/home'
import Message from '../pages/message/message'
import User from '../pages/user/user'
import EditUser from '../pages/editUser/edituser'
import Phone from '../pages/phone/phone'
import TipeGroup from '../pages/phone/TipeGroup/tipeGroup'
import TipeEdit from '../pages/phone/TipeEdit/tipeEdit'
import Personal from '../pages/personal/personal'
import Qrcode from '../pages/personal/Qrcode/qrcode'
import Introduce from '../pages/personal/Introduce/Introduce'
import Assistant from '../pages/personal/Assistant/Assistant'
import AssistantControl from '../pages/personal/AssistantControl/AssistantControl'
import Speech from '../pages/personal/Speech/Speech'
import OrderList from '../pages/personal/OrderList/OrderList'
import Myproduct from '../pages/personal/Myproduct/Myproduct'
import Antd from '../pages/antd/antd'
import Login from '../pages/login/login'


export default class RouteConfig extends Component{
    render(){
        return(
            <HashRouter>
                <Switch>
                    <Route path="/home"  exact component={Home} name="首页"></Route>
                    <Route path="/login" exact component={Login} name="登陆页"></Route>
                    <Route path="/message" exact component={Message} name="消息页"></Route>
                    <Route path="/message/user" exact component={User} name="用户名称页"></Route>
                    <Route path="/message/editUser" exact component={EditUser} name="用户编辑页"></Route>
                    <Route path="/phone" exact component={Phone} name="通讯录页"></Route>
                    <Route path="/phone/tipeGroup" exact component={TipeGroup} name="标签分组页"></Route>
                    <Route path="/phone/tipeEdit" exact component={TipeEdit} name="标签新建页"></Route>
                    <Route path="/phone/tipeEdit/:name/:index" exact component={TipeEdit} name="标签编辑页"></Route>
                    <Route path="/personal" exact component={Personal} name="我的页面"></Route>
                    <Route path="/personal/qrcode" exact component={Qrcode} name="二维码页面"></Route>
                    <Route path="/personal/introduce" exact component={Introduce} name="介绍页面"></Route>
                    <Route path="/personal/assistant" exact component={Assistant} name="小助手页面"></Route>
                    <Route path="/personal/assistantControl" exact component={AssistantControl} name="助手功能页面"></Route>
                    <Route path="/personal/speech" exact component={Speech} name="话术管理页面"></Route>
                    <Route path="/personal/orderList" exact component={OrderList} name="订单管理页面"></Route>
                    <Route path="/personal/myproduct" exact component={Myproduct} name="我的产品页面"></Route>
                    <Route path="/antd" exact component={Antd} name="框架测试页"></Route>
                    <Redirect to="/home" />
                </Switch>
            </HashRouter>
        )
    }
}