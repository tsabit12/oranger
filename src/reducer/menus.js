const initialState = [
  {
    path: "/home",
    icon: "home",
    title: "Halaman Utama",
  },
  {
    path: "/kandidat",
    icon: "groups",
    title: "Data Kandidat",
  },
];

export default function menus(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
