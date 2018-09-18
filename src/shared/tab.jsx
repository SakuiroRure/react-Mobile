import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';
import './tab.less'

export default class Tab extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:[
                {
                    path:'/home',
                    img:require('../assets/助手－默认.png'),
                    activeImg:require('../assets/助手－选中.png'),
                    name:'助手',
                    active:true
                  },
                  {
                    path:'/message',
                    img:require('../assets/聊天－默认.png'),
                    activeImg:require('../assets/聊天－选中.png'),
                    name:'聊天',
                    active:false
                  },
                  {
                    path:'/phone',
                    img:require('../assets/聊天－默认.png'),
                    activeImg:require('../assets/聊天－选中.png'),
                    name:'通讯录',
                    active:false
                  },
                  {
                    path:'/personal',
                    img:require('../assets/通讯录－默认.png'),
                    activeImg:require('../assets/通讯录－选中.png'),
                    name:'我的',
                    active:false
                  }
            ]
        }
    }
    componentDidMount(){
        this.setState({     //tab组件未经过Route包装处理，故路由参数需通过props引入
            route:this.props.route
        })  
    }
    render(){
        return (
            <div id="tab_contain">
                {this.state.list.map((item,index)=>
                    <section className={item.path==this.state.route?"active":null} key={index}>
                        <Link to={item.path}>
                            <img src={item.path==this.state.route?item.activeImg:item.img}/>
                            <span>{item.name}</span>
                        </Link>
                    </section>
                )}
            </div>
        )
    }
}

Tab.PropsTypes = {      //格式校验
    route:PropsTypes.object.isRequired
}

Tab.defaultProps = {    //默认值
    route:"/home"
}