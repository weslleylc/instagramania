import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/Auth/Auth'
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

function Router(){

    return (
        <React.Fragment>
            <CookiesProvider>
                <BrowserRouter>
                    <Route exact path="/" component={Auth}></Route>
                    <Route exact path="/posts" component={App}></Route>
                </BrowserRouter>
            </CookiesProvider>
        </React.Fragment>
    )
}

ReactDOM.render(<Router/>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();