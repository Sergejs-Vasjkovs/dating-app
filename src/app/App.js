import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/NavBar";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import NotFound from "./components/common/NotFound";
import Users from "./layouts/Users";
import LogOut from "./layouts/LogOut";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Route path="/404" component={NotFound} />
                            <Redirect to="404" />
                        </Switch>
                    </ProfessionProvider>
                </QualitiesProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
}

export default App;
