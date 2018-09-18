import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { UserInfo } from '../../service/user';
import { PathUtil} from '../../utils/path';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, Button, DatePicker, List, NoticeBar, NavBar, Picker, Icon, Calendar } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data';
import { connect } from 'react-redux';
import Tab from '../../shared/tab';
import './edituser.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo();
        this.state = {
            info: UserInfo.info,
        }
    }
    componentDidMount() {
        console.log("props", this.props, UserInfo,PathUtil.getQuery(this.props.location.search))
        this.checkLogin()
        this.getProvinceList()
    }
    back() {
        this.props.history.goBack();
    }
    getProvinceList() {
        let api = `/visa/findCityNameByParentId`;
        let params = {
            parentId: 100000
        }
        HttpService.request("get", api, params).then(res => {
            res.data.forEach(g => {
                g.children = g.cityList
                g.id = g.cityId
                g.label = g.value = g.cityName
                delete g.cityList
                delete g.cityId
                delete g.cityName
            })
        })
    }
    checkLogin() {
        let api = `/member/checkLogin`
        HttpService.request("post", api, {}).then(res => {
            console.log("login",res)
        })
    }
    changeInfo(type,value) {
        let info = this.state.info;
        console.log(type,this[type],info)
        info[type] = (value!==undefined&&value!=='')?value:this[type].value
        this.setState({ info })
    }
    toDate(stack) {
        if (stack) {
            let date = new Date(stack)
            return `${date.getFullYear()}-${(date.getMonth() < 10 ? "0" : "") + (date.getMonth() + 1)}-${(date.getDate() < 10 ? "0" : "") + date.getDate()} ${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}`
        }
    }
    save(){
        let info = this.state.info
        UserInfo.setUserInfo({...info})
        console.log("info",UserInfo.info,info)
        this.props.history.goBack();
    }
    fileUpdate(e) {
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
                    info.head_portrait = r.data.filename
                    this.setState({ info })
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    render() {
        return (
            <div id="edituser_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>修改个人资料</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <main>
                    <div className="head">
                        <img src={this.state.info.head_portrait} />
                        <input type="file" onChange={this.fileUpdate.bind(this)} />
                        <button>修改头像</button>
                    </div>
                    <div className="content">
                        <section>
                            <label htmlFor="">
                                <span>姓名</span>
                                <input type="text" value={this.state.info.userName} placeholder="请输入您的用户名" onChange={this.changeInfo.bind(this, "userName",'')} ref={(dom) => this.userName = dom} maxLength="15" />
                            </label>
                        </section>
                        <section>
                            <label htmlFor="">
                                <span>手机</span>
                                <input type="text" value={this.state.info.userPhone} placeholder="请输入您的手机" onChange={this.changeInfo.bind(this, "userPhone",'')} ref={(dom) => this.userPhone = dom} maxLength="11" />
                            </label>
                        </section><section>
                            <label htmlFor="">
                                <span>微信</span>
                                <input type="text" value={this.state.info.userWx} placeholder="请输入您的微信号" onChange={this.changeInfo.bind(this, "userWx",'')} ref={(dom) => this.userWx = dom} maxLength="15" />
                            </label>
                        </section><section>
                            <label htmlFor="">
                                <span>邮箱</span>
                                <input type="text" value={this.state.info.userMail} placeholder="请输入您的邮箱" onChange={this.changeInfo.bind(this, "userMail",'')} ref={(dom) => this.userMail = dom} maxLength="20" />
                            </label>
                        </section>
                        <section>
                            <label htmlFor="" className="address">
                                <span>地区</span>
                                <Picker
                                    title="选择地区"
                                    extra="请选择(可选)"
                                    data={district}
                                    value={this.state.pickerValue}
                                    onChange={v => this.setState({ pickerValue: v })}
                                    onOk={v => this.setState({ pickerValue: v })}
                                    ref={(dom) => this.userAddress = dom}
                                >
                                    <button>{this.state.pickerValue || "please input address"}</button>
                                </Picker>
                            </label>
                        </section>
                        <section>
                            <label htmlFor="">
                                <span>地址</span>
                                <input type="text" value={this.state.info.userPosition} placeholder="请输入您的地址" onChange={this.changeInfo.bind(this, "userPosition",'')} ref={(dom) => this.userPosition = dom} maxLength="20" />
                            </label>
                        </section>
                        <section>
                            <label htmlFor="" className="welcome">
                                <span>欢迎语</span>
                                <TextareaItem
                                    placeholder="与你携手，便是晴天"
                                    value={this.state.info.userWelcome}
                                    onChange={this.changeInfo.bind(this,'userWelcome')} 
                                    ref={(dom) => this.userWelcome = dom}
                                    rows={5}
                                    count={100}
                                />
                            </label>
                        </section>
                        <section>
                            <label htmlFor="" className="isOpen">
                                <span>屏蔽他的通知</span>
                                <Switch  checked={this.state.info.open} platform="ios" color="#c31f9b" onChange={this.changeInfo.bind(this,"open")} />
                            </label>
                        </section>
                        <section className="save">
                            <button onClick={this.save.bind(this)}>保存</button>
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