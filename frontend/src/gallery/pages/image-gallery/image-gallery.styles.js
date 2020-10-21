import styled from "styled-components";

export const GalleryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
  grid-auto-rows: 30rem;
  grid-auto-flow: dense;
  grid-gap: 3rem;
  padding: 2rem 2rem;
  margin-bottom: 5rem;
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 0;
    grid-column-gap: 2.5rem;
  }

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
  }
  @media only screen and (max-width: 700px) {
    padding: 1rem 2rem;
  }
`;
