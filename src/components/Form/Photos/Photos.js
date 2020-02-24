import React, { useState } from 'react';
import s from './Photos.module.scss';
import Photo from './components/Photo/Photo';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  function addImage(item) {
    setPhotos((oldPhoto) => [...oldPhoto, item]);
  }
  function changeImage(item) {
    const index = photos.findIndex((elem) => elem.id === item.id);
    setPhotos([
      ...photos.slice(0, index),
      item,
      ...photos.slice(index + 1),
    ]);
  }
  function deleteImage(id) {
    setPhotos(photos.filter((elem) => elem.id !== id));
  }
  const item = (
    <div className={s.container}>
      {photos.map((elem, index) => (
        <Photo
          key={elem.id}
          name={`photos[${index}]`}
          item={elem}
          index={index}
          onAdd={changeImage}
          onDelete={deleteImage}
        />
      ))}
      {photos.length < 6 && (
        <Photo onAdd={addImage} name={`photos[${photos.length}]`} />
      )}
    </div>
  );
  return (
    <>
      <span className={s.title}>Photos</span>
      {item}
    </>
  );
};

export default Photos;
