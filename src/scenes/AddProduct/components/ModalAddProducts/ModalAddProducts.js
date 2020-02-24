import React, { useState } from 'react';
import Modal from 'react-modal';
import AddProduct from '../../AddProduct';
import { useHistory } from 'react-router';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '80%',
    height: '80%',
    transform: 'translate(-50%, -50%)',
  },
};
const ModalAddProducts = () => {
  const history = useHistory();
  const [isProductAdd, setIsProductAdd] = useState(true);
  function closeAddPopup(e) {
    e.stopPropagation();
    history.goBack();
    setIsProductAdd(false);
  }
  return (
    <Modal
      style={customStyles}
      isOpen={isProductAdd}
      onRequestClose={closeAddPopup}
    >
      <AddProduct />
    </Modal>
  );
};

export default ModalAddProducts;
