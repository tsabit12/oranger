const initialState = [
  {
    path: "/home",
    icon: "home",
    title: "Halaman Utama",
  },
  {
    path: "/kandidat",
    icon: "groups",
    title: "Kandidat Mitra",
  },
  {
    path: "/pks",
    icon: "work_history",
    title: "Data PKS",
  },
  {
    path: "/estimasi",
    icon: "batch_prediction",
    title: "Estimasi Fee",
  },
];

export default function menus(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
