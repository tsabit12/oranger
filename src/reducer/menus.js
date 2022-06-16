const initialState = [
  {
    path: "/home",
    icon: "home",
    title: "Halaman Utama",
    collapse: false,
  },
  {
    path: "/referensi",
    icon: "construction",
    title: "Referensi",
    collapse: true,
    submenu: [
      {
        path: "/referensi/berkas",
        icon: "create_new_folder",
        title: "Berkas",
      },
    ],
  },
  {
    path: "/kandidat",
    icon: "groups",
    title: "Kandidat Mitra",
    collapse: false,
  },
  {
    path: "/pks",
    icon: "work_history",
    title: "Data PKS",
    collapse: false,
  },
  {
    path: "/estimasi",
    icon: "batch_prediction",
    title: "Estimasi Fee",
    collapse: false,
  },
];

export default function menus(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
