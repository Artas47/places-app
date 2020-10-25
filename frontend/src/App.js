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
import Places from "./places/pages/places/places";
import NewPlace from "./places/pages/new-place/new-place";
import Auth from "./user/pages/auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import UsersPlaces from "./places/pages/users-places/users-places";
import UpdatePlace from "./places/pages/update-place/update-place";
import useModal from "./shared/hooks/useModal";
import ImageGallery from "./gallery/pages/image-gallery/image-gallery";

/*
TO DO
limit number of pages
make an option to display one sized images
on hover or smth view place creator
make gallery items random
make possibility to view place on google maps (in modal)
front-end forms validation
back-end forms validation
modal when trying to delete a place
add possibility to show gallery places or admin places in my places page
some effect on image hover
lazy loading images when beeing at the bottom of page
image compess on save
add proptypes
refactor front-end project structure - done
display loading spinner on edit place - kepp in mind
*/

function App() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imgDiemensions, setImgDiemensions] = useState({ height: 0, width: 0 });
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
        <Route path="/gallery" exact>
          <ImageGallery />
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
        <Route path="/gallery" exact>
          <ImageGallery />
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
          imgDiemensions,
          setImgDiemensions,
        }}
      >
        <Router>
          <Header />
          {/* <BackgroundVideo /> */}
          <main
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              position: "relative",
            }}
          >
            {routes}
          </main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
