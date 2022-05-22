/* eslint-disable no-undef */
import axios from "axios";

export default {
  key: () =>
    axios.get(`${process.env.REACT_APP_ENDPOINT}/credential`).then((res) => {
      const { status, result } = res.data;
      if (status === true) {
        return Promise.resolve(result);
      } else {
        return Promise.reject(res.data);
      }
    }),
  references: {
    berkas: (params) =>
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/referensi/berkas`, { params })
        .then((res) => res.data),
    office: (params) =>
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/referensi/office`, { params })
        .then((res) => res.data),
  },
};
