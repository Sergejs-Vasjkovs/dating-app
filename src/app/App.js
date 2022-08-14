import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
// import Users from "../components/Users";
import Login from "../components/layouts/Login";
import Main from "../components/layouts/Main";
// import User from "../components/layouts/User";
import NotFound from "../components/NotFound";
import UsersSwitch from "../components/UsersSwitch";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersSwitch} />
                <Route path="/404" component={NotFound} />
                <Redirect to="404" />
            </Switch>
        </>
    );
}

export default App;
