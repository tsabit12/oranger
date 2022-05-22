import agama from "../data/agama.json";

const initialState = {
  berkas: [],
  agama,
};

export default function references(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
