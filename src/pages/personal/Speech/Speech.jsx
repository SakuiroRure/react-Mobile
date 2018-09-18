import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import './Speech.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info:UserInfo.info,
            delete:'',
            startX:'',
        }
    }
    componentDidMount() {
        console.log("mount", this, this.props,this.state.info)
    }
    add(){
        Modal.prompt('新增功能', '请输入您要添加的功能', [
            { text: '取消', onclose: () => {} },
            { text: '新增', onPress: (value) => {
                let info = this.state.info;
                info.speechList.push({value})
                this.setState({info,delete:''},()=>{
                    console.log("add success!!")
                });
                UserInfo.setUserInfo({speechList:info.speechList})
            }},
        ])
    }
    deleted(index){
        let info = this.state.info;
        info.speechList.splice(index,1);
        this.setState({info,delete:''})
        UserInfo.setUserInfo({speechList:this.state.info.speechList})
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    touchStart(index,event){
        this.setState({
            startX:event.targetTouches[0].pageX,
        })
    }
    touchEnd(index,event){ 
        let endX = event.changedTouches[0].pageX;
        let tance = Math.ceil(Math.abs(endX-this.state.startX))
        if(endX>this.state.startX&&tance>80){
            this.setState({startX:'',delete:""})
        }else if(endX<this.state.startX&&tance>80){
            this.setState({startX:'',delete:index})
        }
    }
    render() {
        return (
            <div id="Speech_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>话术管理</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o"/>
                    </div>
                </NavBar>
                <main>
                    <div className="add" onClick={this.add.bind(this)}>
                        +新增
                    </div>
                    {this.state.info.speechList.map((item,index)=>(
                        <section className="list" 
                                key={index} 
                                onTouchStart={this.touchStart.bind(this,index)}
                                onTouchEnd={this.touchEnd.bind(this,index)}
                                data-index={index}>
                            <span>{item.value}</span>
                            <ReactCssTransitionGroup 
                                transitionName="extra"
                                transitionEnterTimeout={600}
                                transitionLeaveTimeout={600}
                            >
                                {this.state.delete===index&&<div className="delete"><i className="fa fa-trash-o" onClick={this.deleted.bind(this,index)}></i></div>}
                            </ReactCssTransitionGroup>
                        </section>
                    ))}
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