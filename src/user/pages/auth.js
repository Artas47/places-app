import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/form-elements/input';
import Form from '../../shared/components/form-elements/form';
import Label from '../../shared/components/form-elements/label';
import styled from 'styled-components';
import Button from '../../shared/components/button/button';
import validator from 'validator';
import { AuthContext } from '../../shared/context/auth-context';

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

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
    login();
  };

  const onLoggedChange = () => {
    setLoggedIn((prevState) => !prevState);
  };

  const renderNameInput = () => {
    return (
      <>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' name='name' register={register} />
      </>
    );
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {loggedIn ? renderNameInput() : ''}
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          name='email'
          register={register({
            validate: (value) => validator.isEmail(value) || 'Email is invalid',
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
        {errors.password && errors.password.message}
        <br />
        {errors.email && errors.email.message}
        <Button type='submit'>{!loggedIn ? 'Log in' : 'Sign up'}</Button>
        <SignUpText onClick={onLoggedChange}>
          {!loggedIn
            ? 'Doest have an account? Sign up.'
            : 'Already have an accout? Log in.'}
        </SignUpText>
      </Form>
    </FormWrapper>
  );
};

export default Auth;
