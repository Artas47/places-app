import React from "react";
import Fade from "../fade-animation/fade";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import * as Styled from "./footer.styles";

const Footer = ({ pages, currentPage, setCurrentPage, pageNumber }) => {
  return (
    <Fade in={true} classNames="fade">
      <Styled.Footer>
        <FirstPageIcon
          style={{
            width: "2.5rem",
            marginRight: "1rem",
            height: "2.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrentPage(1);
          }}
        />
        <ArrowBackIosIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        />
        {pages.map((page) => (
          <span
            style={{
              margin: "0 1rem",
              color: "#fff",
              fontSize: currentPage === page ? "3rem" : "2rem",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "1rem",
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
        <ArrowForwardIosIcon
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentPage !== pageNumber) {
              setCurrentPage(currentPage + 1);
            }
          }}
        />
        <LastPageIcon
          style={{
            width: "2.5rem",
            marginLeft: "1rem",
            height: "2.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setCurrentPage(pageNumber);
          }}
        />
      </Styled.Footer>
    </Fade>
  );
};

export default Footer;
