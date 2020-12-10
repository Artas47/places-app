import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/form-elements/input";
import Form from "../../shared/components/form-elements/form";
import Label from "../../shared/components/form-elements/label";
import styled from "styled-components";
import Button from "../../shared/components/button/button";
import { AuthContext } from "../../shared/context/auth-context";
import Spinner from "../../shared/components/spinner/spinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Fade from "../../shared/components/fade-animation/fade";
import ImageUpload from "../../shared/components/form-elements/image-upload/image-upload";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validationShemas/loginValidate";
import { renderError } from "../../utils/renderError";
import ErrorBox from "../../shared/components/errorBox/errorBox";

const FormWrapper = styled.div`
  width: 40rem;
  background-color: rgba(255, 255, 255, 0.92);
  z-index: "10";
  padding: 6rem;
  margin: 10rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;
`;

const SignUpText = styled.p`
  margin-top: 2rem;
  color: #4f92e3;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { clearError, isLoading, sendRequest } = useHttpClient();

  const { login } = useContext(AuthContext);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    if (!isLoggingIn) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("password", data.password);
        formData.append("image", data.image[0]);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  const onLoggedChange = () => {
    setIsLoggingIn((prevState) => !prevState);
    reset();
    clearError();
  };

  const renderNameInput = () => {
    return (
      <>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          register={register({ required: "Name is required" })}
        />
      </>
    );
  };
  return (
    <Fade in={true} classNames="fade">
      <div>
        {isLoading ? <Spinner center className="color-white" /> : ""}
        <FormWrapper style={{ filter: isLoading ? "brightness(0.5)" : "" }}>
          <fieldset disabled={isLoading} style={{ border: "0" }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {isLoggingIn ? renderNameInput() : ""}
              {isLoggingIn ? (
                <ImageUpload
                  register={register()}
                  name="image"
                  id="image-id"
                  buttonText="Upload profile image"
                />
              ) : (
                ""
              )}
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" register={register()} />
              <div style={{ margin: "3.5rem 0" }}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  register={register({ required: "Password is required" })}
                />
              </div>
              <ErrorBox>{renderError(errors)}</ErrorBox>
              <Button type="submit">
                {!isLoggingIn ? "Log in" : "Sign up"}
              </Button>
              <SignUpText onClick={onLoggedChange}>
                {!isLoggingIn
                  ? "Doest have an account? Sign up."
                  : "Already have an accout? Log in."}
              </SignUpText>
            </Form>
          </fieldset>
        </FormWrapper>
      </div>
    </Fade>
  );
};

export default Auth;
