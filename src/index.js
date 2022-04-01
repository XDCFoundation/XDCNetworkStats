import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import store from './store.js';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './assets/styles/custom.css';


function Networkstats() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes component={Routes}/>
            </Provider> 
        </BrowserRouter>
    );
}

ReactDOM.render(<Networkstats/>, document.getElementById('root'));
serviceWorker.register();
