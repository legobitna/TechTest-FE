import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../api";
import { toast } from "react-toastify";
const MarkModal = ({ show, setShow, getAllData, data }) => {
  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/leads/${data.id}`);
      if (!res.status === 200) {
        throw new Error("fetch Error");
      }
      getAllData();
      handleClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal_head">
        <Modal.Title>Do you wish to delete this lead?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="delete_lead_form ">
        <Button
          variant="danger"
          type="submit"
          className="delete_lead_btn"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default MarkModal;
