import axios from "axios";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../constants";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1/`,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${Cookies.get(TOKEN)}`,
  },
});

// request.interceptors.response.use(
//   (response) => {
//     // Display a success message
//     toast.success(
//       `success | Hush kelibsiz ${response.data.user.firstName} || ${response.data.user.firstName}`
//     );
//     return response;
//   },
//   (err) => {
//     if (err.response && err.response.data) {
//       const errorMessage =
//         err.response.data.firstName || err.response.data.message;
//       // Display an error message
//       toast.error(errorMessage);
//     } else {
//       toast.error("An error occurred.");
//     }
//     return Promise.reject(err);
//   }
// );
// request.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response && err.response.data) {
//       // Muammoyi hal qilish uchun 'firstName' ni olishdan oldin tekshirish
//       const errorMessage =
//         err.response.data.firstName ||
//         err.response.data.message ||
//         "Xatolik yuz berdi.";
//       toast.error(errorMessage);
//     } else {
//       // Agar 'response' va 'data' mavjud emas, yoki ma'lumotlar bo'sh, o'zgartirilgan xabar chiqaring.
//       toast.error("Xatolik yuz berdi.");
//     }
//     return Promise.reject(err);
//   }
// );



export default request;
