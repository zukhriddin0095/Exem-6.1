// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import { LIMIT, USER } from "../constants";
// import request from "../server";
// import ProtfoliosType from "../types/portfolio";

// interface portfoliosState {
//   user: null | ProtfoliosType;
//   protfolios: ProtfoliosType[];
//   loading: boolean;
//   total: number;
//   page: number;
//   isModalOpen: boolean;
//   modalLoading: boolean;
//   selected: null | string;
//   search: string;
//   getProtfolios: () => void;
//   setPage: (page: number) => void;
//   controlModal: (data: boolean) => void;
//   setModalLoading: (data: boolean) => void;
//   setProtfolios: (protfolios: ProtfoliosType) => void;
//   setSelected: (selected: null | string) => void;
//   setSearch: (search: string) => void;
// }

// const usePortfolios = create<portfoliosState>(
//   devtools((set, get) => ({
//     user: localStorage.getItem(USER)
//       ? JSON.parse(localStorage.getItem(USER) || "")
//       : null,
//     portfolios: [],
//     loading: false,
//     isModalOpen: false,
//     modalLoading: false,
//     selected: null,
//     total: 0,
//     page: 1,
//     search: "",
//     setSearch: (search) => {
//       set({ search });
//       get().getPortfolios();
//     },
//     getPortfolios: async () => {
//       try {
//         set({ loading: true });
//         const {
//           data: { pagination, data },
//         } = await request.get("portfolios", {
//           params: {
//             page: get().page,
//             limit: LIMIT,
//             search: get().search,
//             user: "653a3632b270150018e80632",
//           },
//         });
//         set({
//           portfolios: data,
//           total: pagination.total,
//           loading: false,
//         });
//       } finally {
//         set({ loading: false });
//       }
//     },
//     setPage: (page) => {
//       set({ page });
//       get().getPortfolios();
//     },
//     controlModal: (data) => {
//       set({ isModalOpen: data });
//     },
//     setModalLoading: (data) => {
//       set({ modalLoading: data });
//     },
//     setUser: (user) => {
//       set({ user });
//     },
//     setSelected: (selected) => {
//       set({ selected });
//     },
//   }))
// );

// export default usePortfolios;