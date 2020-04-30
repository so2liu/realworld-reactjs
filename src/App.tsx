import React from "react";
import "gestalt/dist/gestalt.css";
import "antd/dist/antd.css";

import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import { Signup, Login } from "./containers/Auth";
import { useStore } from "./contextProvider";
import { observer } from "mobx-react-lite";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Setting from "./containers/Settings";
import NewPost from "./containers/NewPost";
import NewShort from "./containers/NewShort";
import Home2 from "./containers/Home2";
import Users from "./containers/Users";

function App() {
  const user = useStore().userStore;
  return (
    <div className="App">
      <Navbar
        isSignedin={user.isSignedin}
        user={user.currentUser}
        logout={user.logout}
      />
      <pre>{JSON.stringify(user.currentUser, null, 2)}</pre>
      <Switch>
        <Route path="/home">
          <Home2 />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/short">
          <NewShort />
        </Route>
        <Route path="/editor">
          <NewPost />
        </Route>
        <Route path="/settings">
          <Setting />
        </Route>
        <Route path="/users/:username">
          <Users />
        </Route>
        <Redirect to="/home" />
      </Switch>
    </div>
  );
}

export default observer(App);
