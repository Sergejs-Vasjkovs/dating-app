import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/NavBar";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import NotFound from "./components/common/NotFound";
import Users from "./layouts/Users";
import LogOut from "./layouts/LogOut";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    });
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="404" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
