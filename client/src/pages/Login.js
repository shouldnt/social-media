import React, { useContext, useState } from 'react';
import gql from 'graphql-tag';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Register = () => {
  const navigate = useNavigate();
  const { login: contextLogin } = useContext(AuthContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { values, onSubmit, onChange } = useForm(userLogin, initialState);
  const [errors, setErrors] = useState({});
  const [login, { loading }] = useMutation(LOGIN, {
    update(_, {data: {login: userData}}) {
      contextLogin(userData);
      navigate('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: {
      username: values.username,
      password: values.password
    }
  });
  function userLogin() {
    login();
  }
  return (
    <div className="form-container">
      <h1>Login page</h1>
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
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true: false}
        />

        <Button type="submit" primary>Login</Button>
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
      email
    }
  }
`;

export default Register;
