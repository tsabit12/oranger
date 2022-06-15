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
  register: (formData) =>
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/register`, formData)
      .then((res) => {
        if (res.data.status === true) {
          return Promise.resolve(res);
        } else {
          return Promise.reject(res.data.message);
        }
      }),
  login: (payload) =>
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/auth`, { ...payload })
      .then((res) => res.data),
  user: {
    kandidat: (params) =>
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/kandidat`, { params })
        .then((res) => res.data),
    berkas: (params) =>
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/kandidat/berkas`, { params })
        .then((res) => res.data),
    updateberkas: (payload) =>
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/kandidat/berkas`, {
          ...payload,
        })
        .then((res) => res.data),
    pks: (payload) =>
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/kandidat/pks`, { ...payload })
        .then((res) => res.data),
    review: (payload) =>
      axios
        .post(`${process.env.REACT_APP_ENDPOINT}/kandidat/review`, {
          ...payload,
        })
        .then((res) => res.data),
  },
  pks: {
    get: (params) =>
      axios
        .get(`${process.env.REACT_APP_ENDPOINT}/pks`, { params })
        .then((res) => res.data),
  },
};
