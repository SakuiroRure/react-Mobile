import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import './Myproduct.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info: UserInfo.info,
            open: false,
            startDate: '',
            endDate: '',
            totalDate: '',
            myProductList: [],
            productList: [],
            tabs: [
                { title: '我的产品' },
                { title: '产品库' }
            ],
            tabName: '产品库',
            editList: [],
            editMyList: [],
        }
    }
    componentWillMount() {
        console.log("mount", this, this.props, this.state.info)
        this.getData()
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    calendarCancel() {
        this.setState({
            startDate: '',
            endDate: '',
            totalDate: '',
            open: false
        })
    }
    calendarConfirm(start, end) {
        let s = start.toLocaleDateString();
        let e = end.toLocaleDateString();
        let t = e !== s ? (s + " - " + e) : s
        this.setState({
            startDate: s,
            endDate: e,
            totalDate: t,
            open: false
        })
    }
    getData() {
        let api = `/browsingHistoryInquiry/findUserHistory`
        let params = {
            pageNumber: 1,
            pageSize: 4,
        }
        HttpService.request("get", api, params).then(res => {
            this.setState({
                productList: res.data.historyVos
            })
        })
    }
    fileUpdate(index, e) {
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
    clickTab(tab, index) {
        this.setState({
            tabName: tab.title
        })
    }
    toggleActive(type, index) {
        let edit = type == 1 ? this.state.editMyList : this.state.editList;
        let dest = edit.findIndex(i => i == index);
        dest >= 0 ? edit.splice(dest, 1) : edit.push(index)
        type==1
            ? this.setState({editMyList:edit})
            : this.setState({editList:edit})
        console.log(this.state.editList,this.state.editMyList)
    }
    addProduct(){
        let info = this.state.info;
        this.state.editList.forEach(i=>
            info.productList.find(val=>val.id==this.state.productList[i].id)
                ? Toast.info(`您已添加该产品`)
                : info.productList.push(this.state.productList[i])
        )
        this.setState({info})
        UserInfo.setUserInfo({productList:this.state.info.productList})
        console.log(this.state.info)
    }
    deleteProduct(){
        let info  = this.state.info;
        this.state.editMyList.forEach(i=>
            info.productList.splice(i,1)
        )
        this.setState({info,editMyList:[]})
        UserInfo.setUserInfo({productList:this.state.info.productList})
    }
    render() {
        return (
            <div id="Myproduct_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>产品管理</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <main>
                    <SearchBar placeholder="日期搜索" maxLength={8} value={this.state.totalDate} onFocus={() => this.setState({ open: true })} onCancel={this.calendarCancel.bind(this)} />
                    <Tabs tabs={this.state.tabs} initalPage='2' animated={true} onTabClick={this.clickTab.bind(this)}>
                        <div className="list" style={{ backgroundColor: '#fff' }}>
                            {this.state.info.productList.map((item,index)=>(
                                <section key={index}>
                                    <h4>{item.product_name}</h4>
                                    <span className="price">${item.product_id}</span>
                                    <p>出生日期：{item.group_date.split('、')[0]}</p>
                                    {this.state.editMyList.includes(index)
                                        ? <span className="radio active" onClick={this.toggleActive.bind(this, 1, index)}></span>
                                        : <span className="radio" onClick={this.toggleActive.bind(this, 1, index)}></span>}
                                </section>
                            ))}
                             <button className="handel" onClick={this.deleteProduct.bind(this)}>下架</button>
                        </div>
                        <div className="list" style={{ backgroundColor: '#fff' }}>
                            {this.state.productList.map((item, index) => (
                                <section key={index}>
                                    <h4>{item.product_name}</h4>
                                    <span className="price">${item.product_id}</span>
                                    <p>出生日期：{item.group_date.split('、')[0]}</p>
                                    {this.state.editList.includes(index)
                                        ? <span className="radio active" onClick={this.toggleActive.bind(this, 2, index)}></span>
                                        : <span className="radio" onClick={this.toggleActive.bind(this, 2, index)}></span>}
                                </section>
                            ))}
                            <button className="handel add" onClick={this.addProduct.bind(this)}>添加</button>
                        </div>
                    </Tabs>
                </main>
                <Modal
                    popup
                    visible={this.state.open}
                    animationType="slide-up"
                >
                    <Calendar
                        local={zhCN}
                        enterDirection="vertical"
                        showShortcut={true}
                        onCancel={this.calendarCancel.bind(this)}
                        onConfirm={this.calendarConfirm.bind(this)}
                        visible={this.state.open}
                        defaultDate={new Date()}
                        minDate={new Date((new Date()).getTime() - 5184000000)}
                        maxDate={new Date((new Date()).getTime() + 31536000000)}
                    />
                </Modal>
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