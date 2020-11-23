import React, { useContext, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../shared/components/form-elements/input";
import Form from "../../../shared/components/form-elements/form";
import Label from "../../../shared/components/form-elements/label";
import styled from "styled-components";
import Button from "../../../shared/components/button/button";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Spinner from "../../../shared/components/spinner/spinner";
import { useHistory } from "react-router-dom";
import Fade from "../../../shared/components/fade-animation/fade";
import ImageUpload from "../../../shared/components/form-elements/image-upload/image-upload";
import CustomButton from "../../../shared/components/button/button";
import GoogleMap from "../../../shared/components/google-map/google-map";
import useModal from "../../../shared/hooks/useModal";

const FormWrapper = styled.div`
  width: 60rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.92);
  /* padding: 2rem; */
  margin: 5rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.2);
`;

const ErrorBox = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  font-size: 18px;
  display: flex;
  flex-direction: column;

  text-align: center;
  color: #c70014;
`;

const NewPlace = () => {
  const { register, handleSubmit } = useForm(); // initialise the hook
  const { isLoading, sendRequest, error } = useHttpClient();
  const { userId, token, imgDiemensions } = useContext(AuthContext);
  // const [showMap, setShowMap] = useState(false);
  const { RenderModal, showModal, hideModal } = useModal(false);
  const [zoom, setZoom] = useState(0);

  const setE = useCallback((q) => {
    setZoom(q);
  }, []);
  // const [cords, setCords] = useState({
  //   lat: -0.481747846041145,
  //   lng: 51.3233379650232,
  // });
  // console.log("cordsdfsfsd", cords);
  // console.log("zoom", zoom);
  const history = useHistory();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);
      formData.append("imageWidth", imgDiemensions.width);
      formData.append("imageHeight", imgDiemensions.height);
      formData.append("creator", userId);
      formData.append("address", data.address);
      await sendRequest("http://localhost:5000/api/places", "POST", formData, {
        Authorization: "Bearer " + token,
      });
      history.push("/");
    } catch (err) {}
  };

  return (
    <Fade in={true} classNames="fade">
      <div>
        {isLoading ? (
          <Spinner
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "1",
            }}
            className="color-white"
          />
        ) : (
          ""
        )}
        <FormWrapper
          style={{
            filter: isLoading ? "brightness(0.5)" : "",
            transition: "all .2s",
          }}
        >
          <fieldset disabled={isLoading} style={{ border: "0" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <ImageUpload
                register={register()}
                name="image"
                id="image-id"
                buttonText="Upload place image"
                large
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "75%",
                  margin: "2rem 0",
                }}
              >
                <Label htmlFor="title">Title</Label>
                <Input
                  style={{ marginBottom: "3rem" }}
                  id="title"
                  name="title"
                  register={register}
                />
                <Label htmlFor="address">Address or coordinates</Label>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    height: "5rem",
                    marginBottom: "3rem",
                  }}
                >
                  <Input
                    id="address"
                    name="address"
                    type="address"
                    style={{ width: "50%" }}
                    register={register}
                  />
                  <div
                    style={{
                      width: "20%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "2rem",
                    }}
                  >
                    or
                  </div>
                  <CustomButton
                    onClick={(e) => {
                      e.preventDefault();
                      showModal();
                    }}
                    style={{ width: "20rem", padding: "0" }}
                  >
                    Select place on map
                  </CustomButton>
                </div>
                <ErrorBox>{error ? error : ""}</ErrorBox>
                <Button style={{}} type="submit">
                  Submit
                </Button>
                <RenderModal
                  Component={GoogleMap}
                  componentProps={{
                    placeCords: {
                      lat: -0.481747846041145,
                      lng: 51.3233379650232,
                    },
                  }}
                  styles={{
                    width: "90%",
                  }}
                />
              </div>
            </Form>
          </fieldset>
        </FormWrapper>
      </div>
    </Fade>
  );
};

export default NewPlace;
