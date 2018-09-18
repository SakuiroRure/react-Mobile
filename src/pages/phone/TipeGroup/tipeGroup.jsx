import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../../shared/tab';
import './tipeGroup.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageList: [],
            catalog: this.props.catalog,
            search: '',
            tabs: [
                { title: '最新活动时间' },
                { title: '销售额' },
            ],
            tabName: '最新活动时间',
        }
    }
    componentWillMount() {
        console.log("mount", this, this.props)
    }
    back() {
        this.props.history.goBack();
    }
    toDate(stack) {
        if (stack) {
            let date = new Date(stack)
            return `${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}:${(date.getSeconds() < 10 ? "0" : "") + date.getSeconds()}`
        }
    }
    switchTo(path){
        this.props.history.push(path)
    }
    render() {
        return (
            <div id="TipeGroup_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>标签分组页</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <section className="list">
                    <div className="list_head" onClick={this.switchTo.bind(this,'/phone/tipeEdit')}>
                        +新增
                    </div>
                    <div className="list_content">
                        <section>
                            {this.props.catalog.list.length!==0&&this.props.catalog.list.map((item, index) => (
                                <div className="actionList" key={index} onClick={this.switchTo.bind(this,`/phone/tipeEdit/${item.name}/${index}`)}>
                                    <div className="actionDetail">
                                        <p>{item.name}</p>
                                        <span>最近编辑时间：{this.toDate(item.editTime)}</span>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </section>
                <Tab route={this.props.location.pathname}></Tab>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userInfo: state.userInfo,
        catalog: state.catalog
    }
}, {
        dispatch(type, value) {
            return { type, value }
        }
    })(App)