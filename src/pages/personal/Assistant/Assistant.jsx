import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Assistant.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info:UserInfo.info,
            tabs:[
                {title:'汇总'},
                {title:'昨天'},
                {title:'近七天'},
                {title:'近30天'}
            ],
            tabName:'汇总',
            customerNum:Math.ceil(Math.random()*80+20),
            browseNum:Math.ceil(Math.random()*80+20),
            passNum:Math.ceil(Math.random()*80+20),
            talkNum:Math.ceil(Math.random()*80+20),
            orderNum:Math.ceil(Math.random()*80+20),
            sellNum:Math.ceil(Math.random()*80+20),
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
    fileUpdate(index,e) {
        var file = e.target.files[0];
        let reg = /(\.jpg|\.png|\.gif|\.jpeg|\.PNG|\.BMP|\.RAW|\.tiff|\.AAE)$/ig;
        if (!file)
            return false
        if (!reg.test(file.name)) {
            Toast.info({
                message: '请选择正确图片格式',
                duration: 3000
            });
            return false;
        }
        let formData = new FormData();
        formData.append('file', file);
        formData.append('userId', this.state.info.user_id);
        let api = "/FastDFS/uploadSingleFile";
        HttpService.request("postForm", api, formData, true)
            .then(r => {
                if (r.flag == 20000) {
                    let info = this.state.info;
                    info.introduceImgList[index] = r.data.filename
                    this.setState({ info })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    clickTab(tab,multiple){
        this.setState({
            tabName:tab.title,
            customerNum:Math.ceil(Math.random()*80+20)*(multiple+1),
            browseNum:Math.ceil(Math.random()*80+20)*(multiple+1),
            passNum:Math.ceil(Math.random()*80+20)*(multiple+1),
            talkNum:Math.ceil(Math.random()*80+20)*(multiple+1),
            orderNum:Math.ceil(Math.random()*80+20)*(multiple+1),
            sellNum:Math.ceil(Math.random()*80+20)*(multiple+1),
        })
    }
    render() {
        const tem = (
            <div className="list">
                <section>
                    <div className="sec">
                        <img src={require("../../../assets/personal/kehuzongshu.png")}/>
                        <p>客户总数</p>
                        <span>{this.state.customerNum}</span>
                    </div>
                    <div className="sec">
                        <img src={require("../../../assets/personal/liulanzongshu.png")}/>
                        <p>浏览总数</p>
                        <span>{this.state.browseNum}</span>
                    </div>
                    <div className="sec">
                        <img src={require("../../../assets/personal/beizhuanfazongshu.png")}/>
                        <p>被转发总数</p>
                        <span>{this.state.passNum}</span>
                    </div>
                </section>
                <section>
                    <div className="sec">
                        <img src={require("../../../assets/personal/jiaoliuzongshu.png")}/>
                        <p>交流总数</p>
                        <span>{this.state.talkNum}</span>
                    </div>
                    <div className="sec">
                        <img src={require("../../../assets/personal/dingdanzongshu.png")}/>
                        <p>订单总数</p>
                        <span>{this.state.orderNum}</span>
                    </div>
                    <div className="sec">
                        <img src={require("../../../assets/personal/xiaoshouzongshu.png")}/>
                        <p>销售总额</p>
                        <span>{this.state.sellNum}</span>
                    </div>
                </section>
            </div>
        )
        return (
            <div id="Assistant_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>盈科小助手</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o"/>
                    </div>
                </NavBar>
                <main>
                    <Tabs tabs={this.state.tabs} initalPage={'t2'} animated={true} onTabClick={this.clickTab.bind(this)}>
                        <div className="time" style={{ backgroundColor: '#fff' }}>
                            {tem}
                        </div>
                        <div className="time" style={{ backgroundColor: '#fff' }}>
                            {tem}
                        </div>
                        <div className="time" style={{ backgroundColor: '#fff' }}>
                            {tem}
                        </div>
                        <div className="time" style={{ backgroundColor: '#fff' }}>
                            {tem}
                        </div>
                    </Tabs>
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