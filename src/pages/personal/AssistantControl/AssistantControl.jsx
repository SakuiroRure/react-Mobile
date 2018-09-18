import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import $ from 'jquery';
import './AssistantControl.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info:UserInfo.info,
            open:true,
        }
    }
    componentDidMount() {
        console.log("mount", this, this.props,this.state.info)
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    render() {
        return (
            <div id="AssistantControl_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>助手功能设置</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o"/>
                    </div>
                </NavBar>
                <main>
                    <section className="list">
                        <label htmlFor="">
                            <span>接受通知时间段：9:00-18:00</span>
                        </label>
                    </section>
                    <section>
                        <label htmlFor="">
                            <span>关闭助手通知</span>
                            <Switch  checked={this.state.open} platform="ios" color="#c31f9b" onChange={(open)=>this.setState({open})} />
                        </label>
                    </section>
                </main>
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