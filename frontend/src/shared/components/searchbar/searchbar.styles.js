import styled from "styled-components";

export const Searchbar = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 3rem 0 1rem 0;
`;

export const SearchbarInput = styled.input`
  padding: 1.3rem 3rem;
  width: 25%;
  border-radius: 3rem;
  border: none;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.3);
  outline: none;
  font-size: 2rem;
  opacity: 0.8;
  color: #575757;
  transition: all 0.3s;
  :focus {
    transform: scale(1.05);
  }
`;
