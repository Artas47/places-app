import React from "react";
import { useHistory, useParams } from "react-router-dom";
import * as Styled from "./info-box.styles";
import Fade from "../fade-animation/fade";
import CustomButton from "../button/button";

const InfoBox = ({ label, userId }) => {
  const history = useHistory();
  const params = useParams();

  return (
    <Fade in={true} classNames="fade">
      <Styled.NotFoundMessageBox>
        <Styled.NotFoundMessage>{label}</Styled.NotFoundMessage>
        {!params.userId ? (
          <>
            <p
              style={{
                fontSize: "1.8rem",
                fontWeight: "300",
                margin: "1rem 0",
              }}
            >
              What about creating one?
            </p>
            <CustomButton onClick={() => history.push("/places/new")}>
              Create place
            </CustomButton>
          </>
        ) : (
          ""
        )}
      </Styled.NotFoundMessageBox>
    </Fade>
  );
};

export default InfoBox;
