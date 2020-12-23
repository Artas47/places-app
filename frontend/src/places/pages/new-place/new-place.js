import React, { useContext, useEffect, useState } from "react";
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
import Modal from "../../../shared/components/modal/modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPlaceSchema } from "../../../utils/validationShemas/newPlaceValidate";
import { renderError } from "../../../utils/renderError";
import ErrorBox from "../../../shared/components/errorBox/errorBox";
import ClearIcon from "@material-ui/icons/Clear";

const FormWrapper = styled.div`
  width: 60rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.92);
  margin: 5rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.2);
`;

const NewPlace = () => {
  const [showModal, setShowModal] = useState(false);
  const [cords, setCords] = useState(null);
  const [zoom, setZoom] = useState(null);
  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(newPlaceSchema(cords)),
  });

  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const { userId, token, imgDiemensions } = useContext(AuthContext);

  useEffect(() => {
    clearError();
  }, [cords]);

  const resetValues = () => {
    setCords(null);
    setZoom(null);
    setValue("address", "");
  };

  const history = useHistory();
  const onSubmit = async (data) => {
    let location = {};
    if (cords) {
      location["coordinates"] = cords;
      if (zoom) {
        location["zoom"] = zoom;
      }
    }
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);
      formData.append("imageWidth", imgDiemensions.width);
      formData.append("imageHeight", imgDiemensions.height);
      formData.append("creator", userId);
      formData.append("location", JSON.stringify(location));
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
        {isLoading ? <Spinner center className="color-white" /> : ""}
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
                    marginTop: "0.5rem",
                  }}
                >
                  <div style={{ width: "50%", position: "relative" }}>
                    <Input
                      id="address"
                      name="address"
                      disabled={cords}
                      type="address"
                      onChange={clearError}
                      style={{
                        margin: 0,
                        paddingRight: "3.5rem",
                      }}
                      register={register}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "50%",
                        transform: "translate(0, -50%)",
                      }}
                    >
                      <ClearIcon
                        color="action"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          cursor: "pointer",
                        }}
                        onClick={resetValues}
                      />
                    </span>
                  </div>
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
                      setShowModal(true);
                    }}
                    style={{ width: "20rem", padding: "0" }}
                  >
                    Select place on map
                  </CustomButton>
                </div>
                <ErrorBox>{renderError(errors)} {error && error}</ErrorBox>
                <Button type="submit">Submit</Button>
                {showModal && (
                  <Modal setShowModal={setShowModal}>
                    <GoogleMap
                      setCords={setCords}
                      cords={cords}
                      setZoom={setZoom}
                      zoom={zoom}
                      setValue={setValue}
                    />
                  </Modal>
                )}
              </div>
            </Form>
          </fieldset>
        </FormWrapper>
      </div>
    </Fade>
  );
};

export default NewPlace;
