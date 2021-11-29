import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../context/authContext';
import appConstants from '../appConstants';

const AvatarUpload = ({children}) => {
  const { user, setAvatar } = useContext(AuthContext);
  const [file, setFile] = useState(null)
  const [upload] = useMutation(UPLOAD_FILE_MUTATION, {
    variables: {
      username: user.username,
      file
    },
    onCompleted(data) {
      setAvatar(`${appConstants.apiHost}${data.changeAvatar.filename}`);
    }
  });
  return (
    <>
      {children()}
      <form onSubmit={(e) => {
        e.preventDefault();
        upload();
        }}>
        <input type="file" name="file" onChange={(e) => {
          const file = e.target.files[0] || null;
          console.log(file);
          setFile(file);
        }} />
        <button type="submit">upload</button>
      </form>
    </>
  )
}

const UPLOAD_FILE_MUTATION = gql`
  mutation ChangeAvatar($username: String!, $file: Upload!) {
    changeAvatar(username: $username, file: $file) {
      filename
    }
  }
`;

export default AvatarUpload;
