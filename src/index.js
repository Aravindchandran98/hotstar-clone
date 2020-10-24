import React from 'react';
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import  "bootstrap/dist/css/bootstrap.css";
import  "./hotstar.css";
import  "bootstrap/dist/js/bootstrap";
import  "jquery/dist/jquery";
import  "popper.js/dist/popper";
import App from './App';

ReactDOM.render(<Router>
    <App/>
</Router>,document.querySelector("#root"))
