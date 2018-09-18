import React from 'react';
import ReactDOM from 'react-dom';
import Route from './router/';
import FastClick from 'fastclick';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store/store'
import 'antd-mobile/dist/antd-mobile.css'
import './utils/font-awesome-4.7.0/css/font-awesome.min.css'
import './style/base.css'
import './utils/setRem'

FastClick.attach(document.body);
const render = Component => {
    ReactDOM.render(    //绑定redux、热加载
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root'),
    )
}

render(Route);
if (module.hot) {
    module.hot.accept('./router/', () => {
        render(Route);
    })
}
registerServiceWorker();
