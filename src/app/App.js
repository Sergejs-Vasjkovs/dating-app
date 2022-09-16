import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/ui/NavBar";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import NotFound from "./components/common/NotFound";
import Users from "./layouts/Users";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/404" component={NotFound} />
                <Redirect to="404" />
            </Switch>
        </>
    );
}

export default App;
