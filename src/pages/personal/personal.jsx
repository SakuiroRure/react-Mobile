import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { UserInfo } from '../../service/user';
import { PathUtil} from '../../utils/path';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../shared/tab';
import queryString from 'query-string';
import './personal.less';

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
    switchTo(path,query) {
        switch(path){
            case "/message/editUser":
                UserInfo.setUserInfo({
                    head_portrait:this.state.info.memPhoto,
                    userName:this.state.info.nickName,
                    userPhone:this.state.info.mobile,
                })
                break;
        }
        this.props.history.push(PathUtil.getPath(path,query))
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
            <div id="personal_container">
                <NavBar mode="light">
                    <span>个人中心</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" onClick={this.cancelLogin.bind(this)}/>
                    </div>
                </NavBar>
                <main>
                    <section className="head">
                        <h6>盈科旅游</h6>
                        <h4>
                            {this.state.info.nickName}
                            <img className="edit" src={require('../../assets/personal/修改.svg')} onClick={this.switchTo.bind(this,"/message/editUser",{form:"personal"})}/>
                            <p>销售顾问</p>
                        </h4>
                        <p className="phone">{this.state.info.loginName}</p>
                        <span className="mail">{this.state.info.yingKeCode}</span>
                        <div className="logo">
                            <img src={this.state.info.memPhoto}/>
                            <br/>
                            <button onClick={this.switchTo.bind(this,"/personal/qrcode")}>二维码</button>
                        </div>
                    </section>
                    <section className="content">
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/introduce",'')}>个人介绍</div>
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/assistant",'')}>数据统计</div>
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/myproduct",'')}>产品管理</div>
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/assistantControl",'')}>助手设置</div>
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/speech",'')}>话术管理</div>
                        <div className="sec" onClick={this.switchTo.bind(this,"/personal/orderList",'')}>订单统计</div>
                    </section>
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