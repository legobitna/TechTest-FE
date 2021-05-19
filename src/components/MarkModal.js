import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { leadAction } from "../redux/actions/leadAction";
const MarkModal = ({ show, setShow, data }) => {
  let dispatch = useDispatch();
  const [communication, setCommunication] = useState("");
  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    setCommunication(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(leadAction.addCommunicationData(data.id, communication));
    handleClose();
  };
  useEffect(() => {
    if (data) {
      setCommunication(data.communication || "");
    }
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal_head">
        <Modal.Title>Mark Communication</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} className="update_lead_form">
        <Modal.Body>
          <Form.Label>Communication</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="communication"
            onChange={handleChange}
            value={communication}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={false}
            className="update_lead_btn"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default MarkModal;
