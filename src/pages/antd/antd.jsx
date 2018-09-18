import React, { Component } from 'react';
import { HttpService } from '../../service/http';
import { WingBlank, WhiteSpace, Switch, Range, SearchBar, Tabs, DatePicker, List, NoticeBar, NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import Tab from '../../shared/tab';
import './antd.less';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "Sakuiro",
            bottom: false,
            city: "",
            imageUrl: '',
            value: '',
            open: false,
            boxShow: false,
            tabs: [
                { title: 'First' },
                { title: 'Second' },
                { title: 'Third' },
            ],
            date: new Date("2018-05-23"),
            type:'First'
        }
    }
    componentDidMount() {
        console.log("mount-=-this", this)
    }
    back() {
        this.props.history.goBack();
    }
    switchTo(path) {
        this.props.history.push(path)
    }
    changeSearch(value) {
        this.setState({
            value
        })
    }
    changePrice(value){
        console.log(value)
    }
    render() {
        return (
            <div id="antd_container">
                {/* 顶部标题 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={this.back.bind(this)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >
                    <span>Home</span>
                    {/* <div className="icon">
                        <span>x</span>
                    </div> */}
                </NavBar>
                {/* 滚动信息 */}
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
                </NoticeBar>

                <Tabs tabs={this.state.tabs} initalPage={'t2'} animated={false} onTabClick={(type)=>{this.setState({type:type.title})}}>
                    <div style={{ backgroundColor: '#fff' }}>
                        <QRCode value="https://m.yktour.com.cn" className="qrcode" />
                    </div>
                    <div style={{ backgroundColor: '#fff' }}>
                        <section>
                            <SearchBar
                                value={this.state.value}
                                placeholder="Search"
                                onSubmit={value => console.log(value, 'onSubmit')}
                                onClear={value => console.log(value, 'onClear')}
                                onFocus={() => console.log('onFocus')}
                                onBlur={() => console.log('onBlur')}
                                onCancel={() => console.log('onCancel')}
                                showCancelButton
                                onChange={this.changeSearch.bind(this)}
                                calss="searchInput"
                            />
                        </section>
                        <section>
                            <span>Time:</span>
                            <DatePicker
                                mode="date"
                                title="Select Date"
                                extra="Optional"
                                minDate={new Date(1930, 1, 1, 0, 0, 0)}
                                maxDate={new Date(2050, 12, 31, 23, 59, 59)}
                                value={this.state.date}
                                onChange={date => this.setState({ date })}
                            >
                                <List.Item arrow="horizontal" className="dateInput"></List.Item>
                            </DatePicker>
                        </section>
                        <section className="price">
                            <span>Price:</span>
                            <Range
                              style={{ marginLeft: 30, marginRight: 30 }}
                              min={0}
                              max={10}
                              pushable
                              defaultValue={[2, 8]}
                              onChange={this.changePrice.bind(this)}
                            //   onAfterChange={()=>console.log('afterChange')}
                            />
                        </section>
                        <section className="isOpen">
                            <span>isOpen</span>
                            <Switch  checked={this.state.open} platform="ios" color="#c31f9b" onChange={(open)=>this.setState({open})} />
                        </section>
                    </div>
                    <div style={{ backgroundColor: '#fff' }}>
                        <div className="message">
                            <span>Content of third tab</span>
                            <i className={this.state.boxShow?"fa fa-angle-up":"fa fa-angle-down"} onClick={()=>{this.setState((prev)=>({
                                boxShow:!prev.boxShow
                            }))}}/>
                            {this.state.boxShow&&<div className="messageBox" >
                                <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>}
                        </div>
                    </div>
                </Tabs>
                <Tab></Tab>
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