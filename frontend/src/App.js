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
import Places from "./places/pages/places/places";
import NewPlace from "./places/pages/new-place/new-place";
import Auth from "./user/pages/auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import UsersPlaces from "./places/pages/users-places/users-places";
import UpdatePlace from "./places/pages/update-place/update-place";
import useModal from "./shared/hooks/useModal";
import PlaceMap from "./places/pages/place-map/place-map";
import Gallery from "./places/pages/gallery/gallery";
/*
TO DO
display loading spinner on edit/delete place - done
back-end forms validation
modal when trying to delete a place
lazy loading images when beeing at the bottom of page
add eslint
deploy
backend cleanup/refactor
future plans - likes, followers, users profiles, tags
*/

function App() {
  const [loading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(0);
  const [cords, setCords] = useState({
    lat: -0.481747846041145,
    lng: 51.3233379650232,
  });
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
        <Route path={["/", "/gallery", "/gallery/mapView/:placeId"]} exact>
          <Gallery />
          <PlaceMap path="gallery" />
        </Route>
        <Route path={["/places", "/places/mapView/:placeId"]} exact>
          <PlaceMap path="places" />
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
          <Gallery />
        </Route>
        <Route path="/gallery" exact>
          <Gallery />
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
          setZoom,
          zoom,
          cords,
          setCords,
        }}
      >
        <Router>
          <Header />
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
