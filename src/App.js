import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./api";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import AddModal from "./components/AddModal";
import MarkModal from "./components/MarkModal";
import DeleteModal from "./components/DeleteModal";
function App() {
  const [leadList, setLeadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [markShow, setMarkShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const getAllData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/leads?location_string=India");
      if (res.status === 200) {
        setLoading(false);
        setLeadList(res.data);
      } else {
        throw new Error("fetch error");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Container>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          <Button
            className="add_lead_modal_btn"
            onClick={() => setAddShow(true)}
          >
            Add Lead
          </Button>
          <Table className="leads_table">
            <thead className="leads_table_header">
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Num</th>
              <th>Location Type</th>
              <th>Location String</th>
              <th>Action</th>
            </thead>
            <tbody>
              {leadList.length > 0 &&
                leadList.map((data) => {
                  return (
                    <tr>
                      <th>{`${data.first_name} ${data.last_name}`}</th>
                      <th>{data.email}</th>
                      <th>{data.mobile}</th>
                      <th>{data.location_type}</th>
                      <th>{data.location_string}</th>
                      <th>
                        <Button
                          className="update_lead_modal_btn"
                          onClick={() => {
                            setSelectedData({
                              id: data.id,
                              communication: data.communication,
                            });

                            setMarkShow(true);
                          }}
                        >
                          Mark Update
                        </Button>
                        <Button
                          className="delete_lead_modal_btn"
                          onClick={() => {
                            setSelectedData({ id: data.id });
                            setDeleteShow(true);
                          }}
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <AddModal
            show={addShow}
            setShow={setAddShow}
            getAllData={getAllData}
          />
          <MarkModal
            show={markShow}
            setShow={setMarkShow}
            getAllData={getAllData}
            data={selectedData}
          />
          <DeleteModal
            show={deleteShow}
            setShow={setDeleteShow}
            getAllData={getAllData}
            data={selectedData}
          />
        </>
      )}
    </Container>
  );
}

export default App;
