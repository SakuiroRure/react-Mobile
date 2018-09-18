import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { UserInfo } from '../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, Toast, Button, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../shared/tab';
import './user.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info: UserInfo.info,
            messageList: []
        }
    }
    componentDidMount() {
        console.log("props", this.props, UserInfo)
        this.checkLogin()
    }
    back() {
        this.props.history.goBack();
    }
    checkLogin(){
        let api = `/member/checkLogin`
        HttpService.request("post",api,{}).then(res=>{
            console.log(res)
        })
    }
    toDate(stack) {
        if (stack) {
            let date = new Date(stack)
            return `${date.getFullYear()}-${(date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1)}-${(date.getDate() < 10 ? "0" : "") + date.getDate()} ${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`
        }
    }
    toEdit(){
        this.props.history.push(`/message/edituser`)
    }
    promptOpen(item,index) {
        const opera = [
            { text: '取消', onClose: ()=>{}},
            { text: '添加', onPress: value => this.editTipe(value,item,index)},
        ]
        Modal.className = "tipe"
        Modal.prompt(index?'编辑标签':'添加标签','',opera,'default',index?item:'',['单行输入'])
    }
    editTipe(value,item,index){
        console.log(value,item,index)
        if(!item&&this.state.info.tipes.length==3){
            Toast.info(`标签最多为三项`,1)
        }else if(!item&&this.state.info.tipes.length<3){
            let info = this.state.info
            info.tipes.push(value)
            this.setState({info})
        }else if(item){
            let info = this.state.info;
            value?info.tipes.splice(index,1,value):info.tipes.splice(index,1)
            this.setState({info})
        }
    }
    render() {
        return (
            <div id="user_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>消息</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <main>
                    <div className="head">
                        <div className="head_img" onClick={this.toEdit.bind(this)}>
                            <img src={this.state.info.head_portrait} />
                        </div>
                        <div className="head_container">
                            <span className="name">{this.state.info.user_name}</span>
                            <span className="time">{this.toDate(this.state.info.create_time)}</span>
                            <p className="descibe">{this.state.info.custom_evaluation}</p>
                            <div className="tipes">
                                {this.state.info.tipes.map((item, index) => (
                                    <button key={index} onClick={this.promptOpen.bind(this,item,index)}>{item}</button>
                                ))}
                                <img src={require('../../assets/customer/添加标签＋.png')} onClick={this.promptOpen.bind(this,'','')} />
                            </div>
                        </div>
                    </div>
                    <div className="head_list">
                        <section>
                            <span>浏览名片次数: {this.state.info.product_id}</span>
                        </section>
                        <section>
                            <span>转发名片次数: {this.state.info.relation_id}</span>
                        </section>
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
        product: state.product,
        customer: state.customer,
    }
}, {
        dispatch(type, value) {
            return { type, value }
        }
    })(App)