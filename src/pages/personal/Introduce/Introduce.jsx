import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Introduce.less';

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
    switchTo(path) {
        this.props.history.push(path)
    }
    toDate(stack){
        if(stack){
          let date = new Date(stack)
          return `${(date.getHours()<10?"0":"")+date.getHours()}:${(date.getMinutes()<10?"0":"")+date.getMinutes()}:${(date.getSeconds()<10?"0":"")+date.getSeconds()}`
        }
    }
    setText(value){
        let info = this.state.info;
        info.introduceText = value;
        this.setState({info})
    }
    save(){
        UserInfo.setUserInfo({...this.state.info})
        this.props.history.goBack();
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
    deleteImg(index){
        let info = this.state.info;
        info.introduceImgList[index]=''
        this.setState({info})
    }
    render() {
        return (
            <div id="Introduce_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>个人介绍</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o"/>
                    </div>
                </NavBar>
                <main>
                    <div className="images">
                        {this.state.info.introduceImgList.map((item,index)=>(
                            <div className="image" key={index}>
                                {item
                                    ? <img src={item} className="realImg"/>
                                    : <img src={require("../../../assets/personal/上传图片.svg")}/>}
                                <input type="file" onChange={this.fileUpdate.bind(this,index)}/>                               
                                {item&&<i className="fa fa-trash-o delete" onClick={this.deleteImg.bind(this,index)}/>}
                            </div>
                        ))}
                    </div>
                    <div className="content">
                        <label htmlFor="" className="text">
                            <TextareaItem
                                placeholder="多行输入"
                                value={this.state.info.introduceText}
                                onChange={this.setText.bind(this)} 
                                ref={(dom) => this.userWelcome = dom}
                                rows={5}
                                count={100}
                            />
                        </label>
                        <section className="save">
                            <button onClick={this.save.bind(this)}>保存</button>
                        </section>
                    </div>
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