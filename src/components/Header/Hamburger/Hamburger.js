import React, { useState } from 'react';
import Modal from 'react-modal';
import s from './Hamburger.module.scss';
import MobileMenu from '../../MobileMenu/MobileMenu';

const customStyles = {
  content: {
    top: '50%',
    left: '70%',
    right: 'auto',
    bottom: 'auto',
    width: '50%',
    height: '60%',
    transform: 'translate(-50%, -50%)',
  },
};
const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={`${s.container} ${isOpen && s.open}`}
      onClick={() => setOpen(!isOpen)}
    >
      <span />
      <span />
      <span />
      <Modal
        style={customStyles}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      >
        <MobileMenu />
      </Modal>
    </div>
  );
};

export default Hamburger;
