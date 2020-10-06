import React, { useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Header from "./shared/components/navigation/header/header";
import { GlobalStyles } from "./globalStyles";
import Users from "./user/pages/users";
import Places from "./places/pages/places";
import NewPlace from "./places/pages/new-place";
import Auth from "./user/pages/auth";
import { AuthContext } from "./shared/context/auth-context";
import Modal from "./shared/components/modal/modal";
import { useAuth } from "./shared/hooks/auth-hook";
import UsersPlaces from "./places/pages/users-places";

function App() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");

  const { token, userId, login, logout } = useAuth();

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>SPINNER</div>;
  }

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places" exact>
          <Places />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/edit/:placeId" exact>
          <Places />
          <Modal />
        </Route>
        <Route path="/places/user/:userId" exact>
          <UsersPlaces />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  console.log("places", places);
  console.log("users", users);
  return (
    <div>
      <GlobalStyles />
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          userId,
          token,
          login,
          logout,
          places,
          setPlaces,
          setUsers,
          users,
          searchParam,
          setSearchParam,
        }}
      >
        <Router>
          <Header />
          {/* <BackgroundVideo /> */}
          <main style={{ width: "100%", height: "100%" }}>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
