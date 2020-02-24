import React, { useRef, useState } from 'react';
import s from './UserImage.module.scss';
import UserAvatar from '../../../../components/UserAvatar/UserAvatar';
import * as Api from '../../../../api/Api';
import Loading from '../../../../components/Loading/Loading';

const UserImage = ({ userImage, initial }) => {
  const [imagestate, setImage] = useState(userImage);
  const [isLoading, setIsLoading] = useState(false);
  const input = useRef(null);
  async function addPhoto(evt) {
    setIsLoading(true);
    const image = await Api.Image.upload(evt.target.files[0]);
    setIsLoading(false);
    input.current.value = null;
    setImage(image);
  }
  return (
    <label style={{ display: 'flex' }}>
      <div className={s.container}>
        <input ref={input} hidden onChange={addPhoto} type="file" />
        {isLoading ? (
          <Loading />
        ) : (
          <UserAvatar
            style={{ width: 102, height: 102 }}
            avatar={imagestate}
            initials={initial}
          />
        )}

        <div className={s.upload}>Upgrade Photo</div>
      </div>
    </label>
  );
};

export default UserImage;
