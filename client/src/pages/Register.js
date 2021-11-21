import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';

import { AuthContext } from '../context/authContext';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../utils/hooks';

const Register = (_) => {
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [errors, setErrors] = useState({});
  const { values, onSubmit, onChange } = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      contextLogin(userData);
      navigate('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: {
      registerInput: values
    }
  });
  function registerUser() {
    addUser();
  }
  return (
    <div className="form-container">
      <h1>Register page</h1>
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ""}>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true: false}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true: false}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true: false}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true: false}
        />

        <Button type="submit" primary>Register</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((error, index) => {
              return (
                <li key={index}>{error}</li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register($registerInput: RegisterInput!){
    register(registerInput: $registerInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Register;
