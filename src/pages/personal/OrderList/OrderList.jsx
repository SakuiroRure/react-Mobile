import React, { Component } from 'react';
import { HttpService } from '../../../service/http';
import { UserInfo } from '../../../service/user';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Modal, Tabs, TextareaItem, Toast, DatePicker, List, NoticeBar, NavBar, Icon, Calendar } from 'antd-mobile';
import { connect } from 'react-redux';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import './OrderList.less';

class App extends Component {
    constructor(props) {
        super(props)
        UserInfo.setUserInfo()
        this.state = {
            info: UserInfo.info,
            search: '',
            list: [],
        }
    }
    componentDidMount() {
        console.log("mount", this, this.props, this.state.info)
        this.getOrderList();
    }
    getOrderList() {
        let api = `/orderInquiry/findUserOrderList`
        let params = {
            currentPage: 1,
            hotelOrderStatus: "",
            pageCount: "5",
            requestStatus: 1,
            sid: ["1","5","6","15"].includes(this.state.search)?Number(this.state.search):0,
            ticket_status: "",
            _json: true
        }
        HttpService.request("post", api, params).then(res => {
            if (res.flag == 20000) {
                this.setState({
                    list: res.data
                })
            } else {
                Toast.info(res.msg)
            }
        })
    }
    getStatus(number) {
        let result
        switch (number) {
            case 1: result = "待付款"
                break;
            case 2: result = "待送签"
                break;
            case 3: result = "待出签"
                break;
            case 4: result = "待评价"
                break;
            case 5: result = "已取消"
                break;
            case 6: result = "已退款"
                break;
            case 7: result = "已完成"
                break;
            case 8: result = "退款中"
                break;
            case 9: result = "退款失败"
                break;
            case 10: result = "待确认"
                break;
            case 20: result = "待付款"
                break;
            case 25: result = "已付定金"
                break;
            case 30: result = "待发出团通知书"
                break;
            case 35: result = "待出游"
                break;
            case 36: result = "出游中"
                break;
            case 40: result = "确认不通过"
                break;
            case 50: result = "已退款"
                break;
            case 60: result = "退款失败"
                break;
            case 70: result = "已完成"
                break;
            case 80: result = "已取消"
                break;
            default: result = "退款中"
        }
        console.log(result)
        return result
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    search(value) {
        console.log(value)
        this.getOrderList();
    }
    render() {
        return (
            <div id="OrderList_container">
                <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={this.back.bind(this)}>
                    <span>订单统计</span>
                    <div className="icons">
                        <i className="fa fa-share-alt" />
                        <i className="fa fa-dot-circle-o" />
                    </div>
                </NavBar>
                <main>
                    <SearchBar placeholder="日期搜索" maxLength={8} value={this.state.search} onChange={(value) => this.setState({ search: value })} onSubmit={this.search.bind(this)} />
                    {this.state.list.map((item, index) => (
                        <section className="list" key={index}>
                            <div className="list_head">
                                <h4>订单号：{item.orderNo}</h4>
                                <span className="status">{this.getStatus(item.orderStatus)}</span>
                            </div>
                            <div className="list_content">
                                <p>{item.productName}</p>
                                <span className="price">¥<em>{item.totalPrice}</em></span>
                                <div className="detail">
                                    <ul>
                                        <li>客户姓名: <em>{this.state.info.nickName}</em></li>
                                        <li>分享者: <em>{item.productNo}</em></li>
                                        <li>下单时间: <em>{item.startTime}</em></li>
                                        <li>返回时间: <em>{item.gobacka_time}</em></li>
                                    </ul>
                                </div>
                            </div>
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