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
import { useAuth } from "./shared/hooks/auth-hook";
import UsersPlaces from "./places/pages/users-places";
import UpdatePlace from "./places/pages/update-place";
import useModal from "./shared/hooks/useModal";

/*
TO DO
refactor adding/editing places - done
edit image of added place (or not) - done
display loading spinner on edit place - kepp in mind
fix refreshing places when modal disappear - done
refator modal to be reusable - done
fix error messages in sign up panel - done
show spinner when deleting place - done
*/

function App() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { RenderModal } = useModal();

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
          <RenderModal Component={UpdatePlace} goBack />
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
          setCurrentPage,
          currentPage,
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
