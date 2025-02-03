import React, { useState } from 'react';
import ModalHeader from './modal-header';
import ModalBody from './modal-body';
import ModalFooter from './modal-footer';

const AddTask = ({ setShowModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 ">
        <ModalHeader setShowModal={setShowModal} />
        <ModalBody />
        <ModalFooter />
      </div>
    </div>
  );
};

export default AddTask;
