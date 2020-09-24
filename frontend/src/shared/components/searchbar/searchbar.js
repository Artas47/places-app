import React from "react";
import * as Styled from "./searchbar.styles";

const Searchbar = () => {
  return (
    <Styled.Searchbar>
      <Styled.SearchbarInput type="text" placeholder="Search users..." />
    </Styled.Searchbar>
  );
};

export default Searchbar;
