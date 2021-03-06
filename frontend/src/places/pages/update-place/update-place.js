import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../shared/components/form-elements/input";
import Form from "../../../shared/components/form-elements/form";
import Label from "../../../shared/components/form-elements/label";
import styled from "styled-components";
import Button from "../../../shared/components/button/button";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";

const FormWrapper = styled.div`
  width: 40rem;
  height: 40rem;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 7rem;
  margin: 10rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 26px 6px rgba(0, 0, 0, 0.52);
`;

const UpdatePlace = () => {
  const { register, handleSubmit, errors } = useForm();
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState(null);
  const { placeId } = useParams();
  const { setPlaces, userId, token } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_ROOT_API_ROUTE}/places/${placeId}`
      );
      setLoadedPlace(responseData.place);
    };
    if (placeId) {
      fetchData();
    }
  }, [sendRequest, placeId]);

  const onSubmit = async (data) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_ROOT_API_ROUTE}/places/${loadedPlace._id}`,
        "PATCH",
        JSON.stringify({
          title: data.title,
          description: data.description,
        }),
        {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      );
      const responseData = await sendRequest(
        `${process.env.REACT_APP_ROOT_API_ROUTE}/places/user/${userId}`,
        "GET"
      );
      setPlaces(responseData.places);
      history.push("/places");
    } catch (err) {}
  };

  return (
    <FormWrapper>
      <fieldset disabled={isLoading} style={{ border: "0" }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" register={register} />
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            type="description"
            register={register}
          />
          {errors.password && errors.password.message}
          <br />
          {errors.email && errors.email.message}
          <Button type="submit">Submit</Button>
        </Form>
      </fieldset>
    </FormWrapper>
  );
};

export default UpdatePlace;
