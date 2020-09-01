import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../shared/components/form-elements/input';
import Form from '../../shared/components/form-elements/form';
import Label from '../../shared/components/form-elements/label';
import styled from 'styled-components';
import Button from '../../shared/components/button/button';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Spinner from '../../shared/components/spinner/spinner';
import { useHistory } from 'react-router-dom';
import Fade from '../../shared/components/fade-animation/fade';
import ImageUpload from '../../shared/components/form-elements/image-upload';

const FormWrapper = styled.div`
  width: 40rem;
  height: auto;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 7rem;
  margin: 10rem auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0px 0px 26px 6px rgba(0, 0, 0, 0.52);
`;

const NewPlace = () => {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const { isLoading, sendRequest } = useHttpClient();
  const { userId } = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('image', data.image[0]);
      formData.append('creator', userId);
      formData.append('address', 'warsaw');
      await sendRequest('http://localhost:5000/api/places', 'POST', formData);
      history.push('/');
    } catch (err) {}
  };

  return (
    <Fade in={true} classNames='fade'>
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
            <Label htmlFor='title'>Title</Label>
            <Input id='title' name='title' register={register} />
            <Label htmlFor='description'>Description</Label>
            <Input
              id='description'
              name='description'
              type='description'
              register={register}
            />
            <ImageUpload register={register()} name='image' id='image-id' />
            {errors.password && errors.password.message}
            <br />
            {errors.email && errors.email.message}
            <Button type='submit'>Submit</Button>
          </Form>
        </fieldset>
      </FormWrapper>
    </Fade>
  );
};

export default NewPlace;
