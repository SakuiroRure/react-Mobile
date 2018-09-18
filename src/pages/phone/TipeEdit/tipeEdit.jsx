import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import Tab from '../../../shared/tab';
import * as type from '../../../store/type';
import './tipeEdit.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messageList: [],
            editList:[],
            search: '',
        }
    }
    componentWillMount() {
        console.log("mount", this, this.props.match.params.name)
        this.initData()
        this.getMessageList()
    }
    initData(){
        if(this.props.match.params.name){
            if(!this.props.catalog.list.length){
                this.props.history.goBack()
                window.location.reload();
            }
            const data = this.props.catalog.list.find(i=>i.name==this.props.match.params.name)
            this.state.editList = data.groupList;
            this.setState({
                editList:data.groupList,
                search:data.name
            })
        }
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
    save(){
        if(!this.state.search)
            return 
        if(!this.state.editList.length){
            Toast.info(`请选择组内成员！`)
            return 
        }
        if(this.props.catalog.list.findIndex(i=>i.name==this.state.search)>=0){
            Toast.info(`该标签名已存在！`)
            return 
        }      
        let typeName = this.props.match.params.name?type.UPDATE_GROUP:type.ADD_GROUP
        this.props.dispatch(typeName,{name:this.state.search,editTime:new Date().toLocaleDateString() ,groupList:this.state.editList},this.props.match.params.index)
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    toggleActive(item){
        let editList = this.state.editList;    
        editList.findIndex(i=>i.id==item.id)>=0
            ? editList = editList.filter(i=>i.id!==item.id)
            : editList.push(item)

        this.setState({editList})
        console.log(editList)
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
                messageList: [...res.data.userComments, ...res.data.userComments]
            })
        })
    }
    render() {
        return (
            <div id="tipeEdit_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>通讯录</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <section className="list">
                    <div className="list_head">
                        <SearchBar placeholder="日期搜索" maxLength={8}  value={this.state.search} onChange={value=>this.setState({search:value})}/>
                        <div className="btns">
                            <button onClick={this.back.bind(this)}>取消</button>
                            <button onClick={this.save.bind(this)}>确定({this.state.editList.length})</button>
                        </div>
                    </div>
                    <div className="list_content">
                        <div className="data" style={{ backgroundColor: '#fff' }}>
                            <section>
                                {this.state.messageList.map((item, index) => (
                                    <div className="actionList" key={index}>
                                        <img src={item.head_portrait} />
                                        <div className="actionDetail">
                                            <p>{item.user_name}</p>
                                            <span>最近一次互动事件：{this.toDate(item.create_time)}</span>
                                        </div>
                                        {this.state.editList.findIndex(i=>i.id==item.id)>=0
                                        ? <span className="radio active" onClick={this.toggleActive.bind(this, item)}></span>
                                        : <span className="radio" onClick={this.toggleActive.bind(this, item)}></span>}
                                    </div>
                                ))}
                            </section>
                        </div>
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