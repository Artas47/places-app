import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  places: [],
  setPlaces: () => {},
  users: [],
  setUsers: () => {},
  searchParam: "",
  setSearchParam: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  imgDiemensions: { height: 0, width: 0 },
  setImgDiemensions: () => {},
  setZoom: () => {},
  zoom: {},
  cords: { lat: -0.481747846041145, lng: 51.3233379650232 },
  setCords: () => {},
});
