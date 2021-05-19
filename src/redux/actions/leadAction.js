import api from "../../api";
import { toast } from "react-toastify";
const getAllData = () => async (dispatch) => {
  try {
    dispatch({ type: "START_GET_DATA_REQUEST" });
    console.log("all data");
    const res = await api.get("/leads");
    console.log("all data res", res);
    if (res.status === 200) {
      dispatch({
        type: "START_GET_DATA_REQUEST_SUCCESS",
        payload: res.data.data,
      });
    } else {
      throw new Error("fetch error");
    }
  } catch (err) {
    dispatch({ type: "START_GET_DATA_REQUEST_FAIL" });
    toast.error(err.message);
  }
};

const addLeadData = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/leads/", formData);
    dispatch(getAllData());
  } catch (err) {
    toast.error(err.message);
  }
};

const addCommunicationData = (id, communication) => async (dispatch) => {
  try {
    const res = await api.put(`/mark_lead/${id}`, { communication });
    if (!res.status === 200) {
      throw new Error("fetch Error");
    }
    dispatch(getAllData());
  } catch (err) {
    toast.error(err.message);
  }
};

const deleteData = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/leads/${id}`);
    if (!res.status === 200) {
      throw new Error("fetch Error");
    }
    dispatch(getAllData());
  } catch (err) {
    toast.error(err.message);
  }
};

export const leadAction = {
  getAllData,
  addLeadData,
  addCommunicationData,
  deleteData,
};
