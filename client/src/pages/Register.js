import React, { useContext, useState } from 'react';

import gql from 'graphql-tag';
import classes from 'classnames';

import { AuthContext } from '../context/authContext';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
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
    <>
      <form
        className="block mx-auto" style={{width: 500}}
        onSubmit={onSubmit}
      >
        <div className="pt-10"></div>
        <h1 className={classes(
          'text-3xl font-bold mb-4'
        )}>Register</h1>
        <div className={classes(
          "form-content border border-blue-100 p-6 rounded-xl",
          "shadow-xl"
          )}
        >
          <div className="form-field mb-4">
            <label htmlFor="username"
              className={classes('font-bold mb-2 table')}
            >Username</label>
            <input
              id="username"
              label="Username"
              placeholder="Username"
              name="username"
              type="text"
              value={values.username}
              onChange={onChange}
              error={errors.username ? true: false}
              className={classes(
                'border rounded-lg block w-full p-3',
                'focus:outline-none',
                !errors.username ? 'border-blue-100' : 'border-red-100'
              )}
            />
          </div>
          <div className="form-field mb-4">
            <label htmlFor="email"
              className={classes('font-bold mb-2 table')}
            >Email</label>
            <input
              id="email"
              placeholder="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              error={errors.email ? true: false}
              className={classes(
                'border rounded-lg block w-full p-3',
                'focus:outline-none',
                !errors.email ? 'border-blue-100' : 'border-red-100'
              )}
            />
          </div>
          <div className="form-field mb-4">
            <label htmlFor="password"
              className={classes('font-bold mb-2 table')}
            >Password</label>
            <input
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
              error={errors.password ? true: false}
              className={classes(
                'border rounded-lg block w-full p-3',
                'focus:outline-none',
                !errors.password ? 'border-blue-100' : 'border-red-100'
              )}
            />
          </div><div className="form-field mb-4">
            <label htmlFor="confirmpassword"
              className={classes('font-bold mb-2 table')}
            >Confirm Password</label>
            <input
              id="confirmpassword"
              placeholder="Confirm password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={onChange}
              error={errors.confirmPassword ? true: false}
              className={classes(
                'border rounded-lg block w-full p-3',
                'focus:outline-none',
                !errors.confirmPassword ? 'border-blue-100' : 'border-red-100'
              )}
            />
          </div>
          <div className="pb-3"></div>
          <button type="submit" className={classes(
            'border border-blue-200 rounded-lg py-2 px-5 font-bold',
            'text-blue-500 bg-blue-100',
            'hover:bg-blue-200'
          )}>Register</button>
          {Object.keys(errors).length > 0 && (
            <div className={classes(
              "error-section border border-red-200 rounded-lg",
              "bg-red-50 py-1 px-4 mt-6"
            )}>
              {Object.values(errors).map((message, index) => {
                return (
                  <div key={index} className={classes(
                    'text-red-500 flex items-center',
                    'py-2'
                  )}>
                    <div className={classes(
                      'rounded-full bg-black mr-2'
                    )} style={{width: 6, height: 6}}></div>
                    {message}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </form>
    </>
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
