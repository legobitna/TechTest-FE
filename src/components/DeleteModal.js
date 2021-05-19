import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { leadAction } from "../redux/actions/leadAction";
const MarkModal = ({ show, setShow, data }) => {
  const handleClose = () => setShow(false);
  let dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(leadAction.deleteData(data.id));
    handleClose();
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
