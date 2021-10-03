import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from "./login";
import Search from './search';
import History from './history'
import Crop from './crop1';
import ProfilePopup from './profilePopup'

export default function AppRouter() {

    const loginUser = useSelector(state => state.weathers.loginUser);

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" >
                    {/* <Crop></Crop> */}
                    {loginUser && <Redirect to='main' /> || <Login />}
                </Route>
                <Route path="/main">
                    {!loginUser && <Redirect to='login' /> || <div><Search /><History /></div>}
                </Route>
                <Redirect from="/" to="main"></Redirect>
            </Switch>
        </BrowserRouter >)
}