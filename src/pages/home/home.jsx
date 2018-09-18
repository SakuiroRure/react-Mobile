import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import Tab from '../../shared/tab';
import './home.less';
import { UserInfo } from '../../service/user';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open:false,
            startDate:'',
            endDate:'',
            totalDate: '',
            tabs: [
                { title: '时间' },
                { title: '行为' },
                { title: '人' },
            ],
            tabName:'时间',
            actionList:[],
            timeList:{
                card:22,
                good:14,
                save:6,
                pass:2,
                copy:5
            },
            infoList:[
                {
                    name:"Sakuiro",
                    img:'http://pre.file.yktour.com.cn/group1/M00/00/07/rBABZFjGZaWAfEZqAAZLGsFkcx8562.jpg',
                    total:24,
                    card:12,
                    goods:5,
                    pass:7,
                    open:false,
                },
                {
                    name:"Throme",
                    img:'https://prefile.yktour.com.cn/group1/M00/01/F1/wKiAFFtefLqAOifUAAHO9y9qeuE376.jpg',
                    total:24,
                    card:12,
                    goods:5,
                    pass:7,
                    open:false,
                },
                {
                    name:"Melody",
                    img:'https://prefile.yktour.com.cn/group1/M00/01/F3/wKiAFFtoDeaAdPIsAAFGnFjk51c706.png',
                    total:24,
                    card:12,
                    goods:5,
                    pass:7,
                    open:false,
                }
            ]
        }
    }
    componentDidMount() {
        console.log("mount-=-this", this)
        this.checkLogin();
        this.getActionList();
        UserInfo.setUserInfo({tipes: ["意向客户", "自由行爱好者", "意向客户"]})
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    checkLogin() {
        let api = `/member/checkLogin`
        HttpService.request("post", api, {}).then(res => {
           res.data===0?
            Modal.alert('登录提示', '您还未登录，请移步登录界面!', [
                { text: '登录', onPress: () => {this.props.history.push(`/login`)} },
            ]):null
        })
    }
    changeOpen(index){
        let infoList = this.state.infoList;
        infoList[index].open = !infoList[index].open
        this.setState({infoList})
    }
    getActionList(){
        let api = `/userComments/getProductComments`
        let params = {
            product_type:1,
            product_id:39817,
            pageNow:1,
            pageSize:10,
        }
        HttpService.request("get",api,params).then(res=>{
            this.setState({
                actionList:res.data.userComments
            })
        })
    }
    calendarCancel(){
        this.setState({
            startDate:'',
            endDate:'',
            totalDate:'',
            open:false
        })
    }
    calendarConfirm(start,end){
        let s = start.toLocaleDateString();
        let e = end.toLocaleDateString();
        let t = e!==s?(s+" - "+e):s
        this.setState({
            startDate:s,
            endDate:e,
            totalDate:t,
            open:false
        })
    }
    toDate(stack){
        if(stack){
          let date = new Date(stack)
          return `${date.getFullYear()}-${(date.getMonth()<10?"0":"")+(date.getMonth()+1)}-${(date.getDate()<10?"0":"")+date.getDate()} `
        }
    }
    render() {
        return (
            <div id="home_container">
                <NavBar mode="light">
                    <span>盈科小助手</span>
                    <div className="icons">
                        <i className="fa fa-share-alt"/>
                        <i className="fa fa-dot-circle-o"/>
                    </div>
                </NavBar>

                <Tabs tabs={this.state.tabs} initalPage={'t2'} animated={true} onTabClick={(tabName)=>{this.setState({tabName:tabName.title})}}>
                    <div className="time" style={{ backgroundColor: '#fff' }}>
                        <section>
                            {/* <Switch  checked={this.state.open} platform="ios" color="#c31f9b" onChange={(open)=>this.setState({open})} /> */}
                            <SearchBar placeholder="日期搜索" maxLength={8} value={this.state.totalDate} onFocus={()=>this.setState({open:true})} onCancel={this.calendarCancel.bind(this)}/>
                            <div className="timeList">
                                <span>查看名片</span>
                                <span className="count">{this.state.timeList.card}次</span>
                            </div>
                            <div className="timeList">
                                <span>查看商品</span>
                                <span className="count">{this.state.timeList.good}次</span>
                            </div>
                            <div className="timeList">
                                <span>保存名片</span>
                                <span className="count">{this.state.timeList.save}次</span>
                            </div>
                            <div className="timeList">
                                <span>转发名片</span>
                                <span className="count">{this.state.timeList.pass}次</span>
                            </div>
                            <div className="timeList">
                                <span>复制微信</span>
                                <span className="count">{this.state.timeList.card}次</span>
                            </div>
                        </section>
                    </div>
                    <div className="action" style={{ backgroundColor: '#fff' }}>
                        <section>
                            {this.state.actionList.map((item,index)=>(
                                <div className="actionList" key={index}>
                                    <img src={item.head_portrait}/>
                                    <div className="actionDetail">
                                        <p>{item.user_name}查看了您的名片第{item.id}次</p>
                                        <span>{this.toDate(item.create_time)}</span>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="person" style={{ backgroundColor: '#fff' }}>
                        <section>
                            {this.state.infoList.map((item,index)=>(
                                <div className="infoList" key={index}>
                                    <div className="infoName">
                                        <img src={item.img}/>
                                        <span>{item.name}</span>
                                        <span className="count" onClick={this.changeOpen.bind(this,index)}>
                                            {item.total}次<i className={item.open?"fa fa-angle-down":"fa fa-angle-up"}></i>
                                        </span>
                                    </div>
                                    {item.open&&<div className="infoDetail">
                                        <span>查看名片</span>
                                        <span className="count">{item.card}次</span>
                                    </div>}
                                    {item.open&&<div className="infoDetail">
                                        <span>查看商品</span>
                                        <span className="count">{item.goods}次</span>
                                    </div>}
                                    {item.open&&<div className="infoDetail">
                                        <span>转发名片</span>
                                        <span className="count">{item.pass}次</span>
                                    </div>}
                                </div>
                            ))}
                        </section>
                    </div>
                </Tabs>
                <Modal
                  popup
                  visible={this.state.open}
                  animationType="slide-up"
                >
                    <Calendar
                        local={zhCN}
                        enterDirection="vertical"
                        showShortcut = {true}
                        onCancel={this.calendarCancel.bind(this)}
                        onConfirm={this.calendarConfirm.bind(this)}
                        visible={this.state.open}
                        defaultDate={new Date()}
                        minDate={new Date((new Date()).getTime() - 5184000000)}
                        maxDate={new Date((new Date()).getTime() + 31536000000)}
                    />
                </Modal>
                <Tab></Tab>
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