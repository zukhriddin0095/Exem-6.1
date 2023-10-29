import { useState, useEffect, Fragment } from "react";
import User from "../../types/user";
import { TOKEN, USER } from "../../constants";
import Cookies from "js-cookie";


import "./style.scss";
import { useNavigate } from "react-router-dom";
const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    function getUser() {
      const userString = localStorage.getItem(USER);
      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      }
    }
    getUser();
  }, []);

  function logout() {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    navigate("/login");
  }

  return (
    <Fragment>
      <div className="userpage">
        <button onClick={logout} className="logout__user__sss">
          <i className="bx bx-log-out-circle"></i>
        </button>
        <div className="userpage__wrapper">
          <h3>
            Assalomu Alekum{" "}
            <mark>
              {user?.firstName.toLocaleUpperCase()}{" "}
              {user?.lastName.toUpperCase()}
            </mark>{" "}
            siz muvaffaqiyatli royhatdan o'tingiz, agar o'zingiz uchun
            portfolios qilmoqchi bolsangiz iltimos admin{" "}
            <mark>Abdulaziz Toshpolatov</mark> ga murojat qiling shu nomerga
            +998999400807 etboringiz uchun rahmat!
          </h3>
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;
