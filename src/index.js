import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter,
    Route,
    Link, Redirect
} from 'react-router-dom';
import {Navbar, Button, Alignment} from "@blueprintjs/core";

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>API Console</Navbar.Heading>
                    <Navbar.Divider/>
                    <Button className="bp3-minimal" icon="home" text="Home"/>
                </Navbar.Group>
            </Navbar>
            <Route exact path="/"
                   component={() => {
                       return <App/>
                   }}/>
        </div>

    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
