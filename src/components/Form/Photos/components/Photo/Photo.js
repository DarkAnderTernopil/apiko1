import React, { useRef, useState } from 'react';
import s from './Photo.module.scss';
import Icon from '../../../../Icons/Icon';
import * as Api from '../../../../../api/Api';
import { useField } from 'formik';
import Loading from '../../../../Loading/Loading';
// import uploadPhoto from '../../../../../scenes/uploadPhoto';

const Photo = ({ onAdd, onDelete, item = {}, index, ...props }) => {
  const id = item.id || Date.now();
  const [field, , helpers] = useField(props);
  const [isLoading, setIsLoading] = useState(false);
  const { setValue } = helpers;
  const input = useRef(null);
  async function addPhoto(evt) {
    setIsLoading(true);
    const image = await Api.Image.upload(evt.target.files[0]);
    setIsLoading(false);
    input.current.value = null;
    setValue(image);
    onAdd({ image, id });
  }
  return (
    <div className={s.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <label htmlFor={id} className={s.label}>
            <input
              ref={input}
              id={id}
              type="file"
              onChange={addPhoto}
            />
            <input type="text" {...field} hidden />
            {item.image ? (
              <>
                <img className={s.img} src={item.image} alt="" />
              </>
            ) : (
              <Icon name="plus" />
            )}
          </label>
          {item.image && (
            <div
              onClick={() => onDelete(item.id)}
              className={s.delete}
            >
              <Icon className={s.icon} name="exit" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Photo;
