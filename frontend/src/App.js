import React, { useLayoutEffect, useState, useCallback } from "react";
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
import PlaceMap from "./places/pages/place-map/place-map";
import Gallery from "./places/pages/gallery/gallery";
/*
TO DO
make an option to display one sized images
on hover or smth view place creator - done
make gallery items random - done
make possibility to view place on google maps (in modal propably)
front-end forms validation
back-end forms validation
modal when trying to delete a place
some effect on image hover - 0/5
lazy loading images when beeing at the bottom of page
image compress on save
add proptypes
paginate gallery images - done
refactor front-end project structure - done
display loading spinner on edit place - kepp in mind
loading spinner when loading whole gallery - done
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
          <Places />
          <PlaceMap path="places" />
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
