import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../shared/tab';
import './phone.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageList: [],
            search: '',
            tabs: [
                { title: '最新活动时间' },
                { title: '销售额' },
            ],
            tabName:'最新活动时间',
        }
    }
    componentDidMount() {
        console.log("mount", this, this.props)
        this.getMessageList()
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
    toTipe(num){
        let result;
        switch(num){
            case 1:
                result = "意向用户"
                break;
            case 2:
                result = "金主"
                break;
            case 3:
                result = "投资商"
                break;
            case 4:
                result = "用户"
                break;
            case 5:
                result = "咨询者"
                break;
            default:result = "🐮"
        }
        return result
    }
    switchTo(path){
        this.props.history.push(path)
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
                messageList: [...res.data.userComments,...res.data.userComments]
            })
        })
    }
    render() {
        const tem = (
            <section>
                {this.state.messageList.map((item, index) => (
                    <div className="actionList" key={index}>
                        <img src={item.head_portrait}/>
                        <div className="actionDetail">
                            <p>{item.user_name}</p>
                            {this.state.tabName=="最新活动时间"&&<div className="tipes">
                                {Math.random()<0.5&&<button>{this.toTipe(item.delete_status)}</button>}
                                {Math.random()<0.5&&<button>{this.toTipe(item.evaluation_source)}</button>}
                                {Math.random()<0.5&&<button>{this.toTipe(item.evaluation_type)}</button>}
                            </div>}
                            <br/>
                            {this.state.tabName=="最新活动时间"&&<span>最近一次互动事件：{this.toDate(item.create_time)}</span>}
                            {this.state.tabName=="销售额"&&<span>本月营业额：{this.toDate(item.id)}</span>}
                        </div>
                    </div>
                ))}
            </section>
        )
        return (
            <div id="phone_container">
                <NavBar mode="light">
                    <span>通讯录</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <section className="list">
                    <div className="list_head">
                        <SearchBar placeholder="日期搜索" maxLength={8} value={this.state.search} onChange={(value) => this.setState({ search: value })} showCancelButton="false" />
                        <img src={require("../../assets/personal/标签分组－按钮.png")}  onClick={this.switchTo.bind(this,'/phone/tipeGroup')}/>
                    </div>
                    <div className="list_content">
                        <Tabs tabs={this.state.tabs} initalPage={'t2'} animated={true} onTabClick={(tabName) => { this.setState({ tabName: tabName.title }) }}>
                            <div className="new" style={{ backgroundColor: '#fff' }}>
                                {tem}
                            </div>
                        </Tabs>
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