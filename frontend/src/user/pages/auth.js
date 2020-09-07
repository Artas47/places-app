import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/form-elements/input';
import Form from '../../shared/components/form-elements/form';
import Label from '../../shared/components/form-elements/label';
import styled from 'styled-components';
import Button from '../../shared/components/button/button';
import validator from 'validator';
import { AuthContext } from '../../shared/context/auth-context';
import Spinner from '../../shared/components/spinner/spinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Fade from '../../shared/components/fade-animation/fade';
import ImageUpload from '../../shared/components/form-elements/image-upload';

const FormWrapper = styled.div`
  width: 40rem;
  background-color: rgba(255, 255, 255, 0.92);
  z-index: '10';
  padding: 6rem;
  margin: 10rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 26px 6px rgba(0, 0, 0, 0.52);
  transition: all 0.2s;
`;

const SignUpText = styled.p`
  margin-top: 2rem;
  color: #4f92e3;
  font-size: 1.3rem;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #c70014;
`;

const Auth = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { error, isLoading, sendRequest } = useHttpClient();

  const { login } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = async (data) => {
    if (!isLoggingIn) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('name', data.name);
        formData.append('password', data.password);
        formData.append('image', data.image[0]);
        await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        login();
      } catch (err) {}
    }
  };

  const onLoggedChange = () => {
    setIsLoggingIn((prevState) => !prevState);
  };

  const renderNameInput = () => {
    return (
      <>
        <Label htmlFor='name'>Name</Label>
        <Input
          id='name'
          name='name'
          register={register({ required: 'Name is required' })}
        />
      </>
    );
  };
  return (
    <Fade in={true} classNames='fade'>
      <div>
        {isLoading ? (
          <Spinner
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1',
            }}
            className='color-white'
          />
        ) : (
          ''
        )}
        <FormWrapper style={{ filter: isLoading ? 'brightness(0.5)' : '' }}>
          <fieldset disabled={isLoading} style={{ border: '0' }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {isLoggingIn ? renderNameInput() : ''}
              {isLoggingIn ? (
                <ImageUpload register={register()} name='image' id='image-id' />
              ) : (
                ''
              )}
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                name='email'
                register={register({
                  validate: (value) =>
                    validator.isEmail(value) || 'Email is invalid',
                  required: 'Email is required',
                })}
              />
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                name='password'
                type='password'
                register={register({ required: 'Password is required' })}
              />
              <ErrorContainer>
                {errors.password && errors.password.message}
                <br />
                {errors.email && errors.email.message}
                <br />
                {errors.name && errors.name.message}
                {error ? error : ''}
              </ErrorContainer>
              <Button type='submit'>
                {!isLoggingIn ? 'Log in' : 'Sign up'}
              </Button>
              <SignUpText onClick={onLoggedChange}>
                {!isLoggingIn
                  ? 'Doest have an account? Sign up.'
                  : 'Already have an accout? Log in.'}
              </SignUpText>
            </Form>
          </fieldset>
        </FormWrapper>
      </div>
    </Fade>
  );
};

export default Auth;
