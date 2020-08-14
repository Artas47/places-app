import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/form-elements/input';
import Form from '../../shared/components/form-elements/form';
import Label from '../../shared/components/form-elements/label';
import styled from 'styled-components';
import Button from '../../shared/components/button/button';

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

const NewPlace = () => {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' name='email' register={register} />
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          name='password'
          type='password'
          register={register({ required: true })}
        />
        {errors.password && 'Password is required.'}
        <Button type='submit'>Submit</Button>
      </Form>
    </FormWrapper>
  );
};

export default NewPlace;
