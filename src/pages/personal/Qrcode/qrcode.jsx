import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import Tab from '../../../shared/tab';
import './qrcode.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info:UserInfo.info,
            messageList: []
        }
    }
    componentWillMount() {
        console.log("mount", this, this.props,this.state.info)
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    cancelLogin(){
        let api = `/httpRequest/cancelCookie`
        HttpService.request("get",api,{}).then(res=>{
            Toast.info(res.msg)
        })
    }
    toDate(stack){
        if(stack){
          let date = new Date(stack)
          return `${(date.getHours()<10?"0":"")+date.getHours()}:${(date.getMinutes()<10?"0":"")+date.getMinutes()}:${(date.getSeconds()<10?"0":"")+date.getSeconds()}`
        }
    }
    render() {
        return (
            <div id="qrcode_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>{this.state.info.nickName}的二维码</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" onClick={this.cancelLogin.bind(this)}/>
                    </div>
                </NavBar>
                <main>
                    <div className="code">
                        <h4>扫一扫</h4>
                        <h5>扫一扫进入我的名片</h5>
                        <QRCode value="https://m.yktour.com.cn?type=qrcode" className="qrcode" />
                        <p>{this.state.info.nickName}</p>
                        <span className="phone">手机:{this.state.info.mobile}</span>
                        <span className="ykcode">盈科码:{this.state.info.yingKeCode}</span>
                        <span className="rank">会员等级:{this.state.info.gradeName}</span>
                    </div>
                </main>
                <Tab route={this.props.location.pathname}></Tab>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userInfo: state.userInfo,
        product: state.product
    }
}, {
        dispatch(type, value) {
            return { type, value }
        }
    })(App)