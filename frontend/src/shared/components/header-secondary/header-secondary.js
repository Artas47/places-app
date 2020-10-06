import React from "react";
import Searchbar from "../searchbar/searchbar";
import AppsIcon from "@material-ui/icons/Apps";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";

const HeaderSecondary = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2rem",
      }}
    >
      <Searchbar style={{ justifyContent: "center" }} />
      <div
        style={{
          position: "absolute",
          right: "10rem",
        }}
      >
        <AppsIcon style={{ color: "#fff", width: "4rem", height: "4rem" }} />
        <ViewCarouselIcon
          style={{
            color: "#fff",
            width: "4rem",
            height: "4rem",
            marginLeft: "2rem",
          }}
        />
        {/* <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
          <Select
            autoWidth={false}
            style={{ backgroundColor: "#fff", width: "15rem" }}
            variant="outlined"
            color="red"
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            // value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
      </div>
    </div>
  );
};

export default HeaderSecondary;
