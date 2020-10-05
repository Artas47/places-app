import React, { useState } from "react";
import * as Styled from "./searchbar.styles";
import { useDebounce } from "../../hooks/useDebounce";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  console.log("debouncedSearchTerm", debouncedSearchTerm);
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
