import React, { useState } from "react";
import { Button, Form, Row, Col, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { leadAction } from "../redux/actions/leadAction";
const AddModal = ({ show, setShow }) => {
  let dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    location_type: "City",
    location_string: "",
  });
  const handleClose = () => setShow(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(leadAction.addLeadData(formData));

    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="modal_head">
        <Modal.Title>Add Lead</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First name"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last name"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                placeholder="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                placeholder="mobile number"
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Location Type</Form.Label>
              <Form.Control
                as="select"
                name="location_type"
                value={formData.location_type}
                onChange={handleChange}
                required
              >
                <option value="City" selected>
                  City
                </option>
                <option value="Zip">Zip</option>
                <option value="Country">Country</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Location String</Form.Label>
              <Form.Control
                name="location_string"
                required
                value={formData.location_string}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={
              !(
                formData.first_name &&
                formData.last_name &&
                formData.email &&
                formData.mobile &&
                formData.location_type &&
                formData.location_string
              )
            }
            className="add_lead_btn"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddModal;
