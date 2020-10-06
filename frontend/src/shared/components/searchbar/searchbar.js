import React, { useState, useEffect, useContext } from "react";
import * as Styled from "./searchbar.styles";
import { useDebounce } from "../../hooks/useDebounce";
import { AuthContext } from "../../context/auth-context";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const { setSearchParam } = useContext(AuthContext);
  useEffect(() => {
    setSearchParam(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchParam]);
  return (
    <Styled.Searchbar>
      <Styled.SearchbarInput
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        placeholder="Search users..."
      />
    </Styled.Searchbar>
  );
};

export default Searchbar;
