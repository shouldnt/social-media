import React, { useContext, useMemo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import classes from 'classnames';

import { AuthContext } from '../context/authContext';
import appConstants from '../appConstants';

const AvatarUpload = ({onCompleted, onCloseClick}) => {
  const { user, setAvatar } = useContext(AuthContext);
  const [file, setFile] = useState(null)
  const imagePreviewLink = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file])
  const [upload, {loading}] = useMutation(UPLOAD_FILE_MUTATION, {
    variables: {
      username: user.username,
      file
    },
    onCompleted(data) {
      setAvatar(`${appConstants.apiHost}${data.changeAvatar.filename}`);
      onCompleted && onCompleted();
    }
  });
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-60 absolute w-full h-full top-0 left-0 flex items-center justify-center"></div>
        <form
          className={classes(
            "relative bg-white border border-blue-100 p-3 rounded-lg"
          )}
          onSubmit={(e) => {
            e.preventDefault();
            upload();
          }}
          style={{width: 300}}
        >
          {file && (
            <div className="img-preview mb-3">
              <img src={imagePreviewLink} alt=""
                className={classes(
                  'block'
                )}
              />
            </div>
          )}
          <div
            className={classes(
              'flex items-center'
            )}
          >
            <label
              className="flex-grow"
              htmlFor="avatar-input"
            >
              <div
                className={classes(
                  "button bg-blue-200 border border-blue-100 text-blue-400 font-bold",
                  "px-3 py-2 rounded mr-2",
                  "text-center cursor-pointer",
                  "hover:text-blue-700"
                )}
              >
                {file ? file.name : 'Choose file'}
              </div>
            </label>
            <button type="submit"
              disabled={loading}
              className={classes(
                "text-blue-600 bg-blue-200 rounded px-3 py-2 cursor-pointer",
                "hover:text-blue-800"
              )}
            >{loading ? (
              <i class="ri-loader-4-line animate-spin block"></i>
            ): (<i className="ri-upload-cloud-2-line block"></i>)}</button>
          </div>
          <input
            accept="image/png, image/gif, image/jpeg"
            id="avatar-input"
            className="hidden"
            type="file"
            name="file" onChange={(e) => {
              const file = e.target.files[0] || null;
              setFile(file);
            }}
          />

          <div
            className={classes(
              "close-btn absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2",
              "bg-white rounded-full flex items-center justify-center",
              "shadow-lg cursor-pointer text-blue-400",
              "hover:text-red-400"
            )}
            style={{width: 20, height: 20}}
            onClick={() => onCloseClick ? onCloseClick() : null}
          ><i className="ri-close-line"></i></div>
        </form>
      </div>
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
