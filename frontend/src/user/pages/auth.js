import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/form-elements/input';
import Form from '../../shared/components/form-elements/form';
import Label from '../../shared/components/form-elements/label';
import styled from 'styled-components';
import Button from '../../shared/components/button/button';
import validator from 'validator';
import { AuthContext } from '../../shared/context/auth-context';
import axios from 'axios';
import Spinner from '../../shared/components/spinner/spinner';

const FormWrapper = styled.div`
  width: 40rem;
  /* height: 45rem; */
  background-color: rgba(255, 255, 255, 0.92);
  padding: 7rem;
  margin: 10rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 26px 6px rgba(0, 0, 0, 0.52);
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!isLoggingIn) {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/login',
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('response', response);
        setIsLoading(false);
        login();
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        login();
      } catch (err) {
        console.log('err', err);
        setError(err.message || 'Something went wrong');
        setIsLoading(false);
      }
    }
  };
  console.log('error', error);
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
  console.log('error', error);
  return (
    <FormWrapper>
      <fieldset disabled={isLoading} style={{ border: '0' }}>
        {isLoading ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '60%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Spinner />
          </div>
        ) : (
          ''
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          {isLoggingIn ? renderNameInput() : ''}
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
          <Button type='submit'>{!isLoggingIn ? 'Log in' : 'Sign up'}</Button>
          <SignUpText onClick={onLoggedChange}>
            {!isLoggingIn
              ? 'Doest have an account? Sign up.'
              : 'Already have an accout? Log in.'}
          </SignUpText>
        </Form>
      </fieldset>
    </FormWrapper>
  );
};

export default Auth;
