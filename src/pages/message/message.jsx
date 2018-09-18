import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { UserInfo } from '../../service/user';
import * as type from '../../store/type';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../shared/tab';
import './message.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageList: []
        }
    }
    componentWillMount() {
        console.log("mount", this, this.props)
        this.getMessageList()
    }
    back() {
        this.props.history.goBack();
    }
    toDate(stack){
        if(stack){
          let date = new Date(stack)
          return `${(date.getHours()<10?"0":"")+date.getHours()}:${(date.getMinutes()<10?"0":"")+date.getMinutes()}`
        }
    }
    toUser(item){
        this.props.dispatch(type.Customer_Edit,item)
        UserInfo.setUserInfo(item)
        this.props.history.push(`/message/user`)
    }
    getMessageList() {
        let api = `/userComments/getProductComments`
        let params = {
            product_type: 1,
            product_id: 39817,
            pageNow: 1,
            pageSize: 10,
        }
        HttpService.request("get", api, params).then(res => {
            this.setState({
                messageList: res.data.userComments
            })
        })
    }
    render() {
        return (
            <div id="message_container">
                <NavBar mode="light">
                    <span>消息</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <section className="list">
                    {this.state.messageList.map((item, index) => (
                        <div className="actionList" onClick={this.toUser.bind(this,item)} key={index}>
                            <img src={item.head_portrait} />
                            <div className="actionDetail">
                                <p>{item.user_name}</p>
                                <span className="comment">{item.custom_evaluation}</span>
                                <span className="count">
                                    {this.toDate(item.create_time)}
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </section>
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