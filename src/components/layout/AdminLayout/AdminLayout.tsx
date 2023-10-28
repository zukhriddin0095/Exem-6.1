import { Fragment, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./style.scss";
import { TOKEN, USER, USER_ID } from "../../../constants";
import User from "../../../types/user";
import avatar from "../../../assets/avatar.jpg";
import request from "../../../server";

const AdminLayout = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState("");
  const [total, setTotal] = useState<string | number>(0);
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleMenuItemClick = (active: string) => {
    setActiveMenuItem(active);
  };
  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function getUser() {
    const userString = localStorage.getItem(USER);
    if (userString) {
      const parsedUser = JSON.parse(userString);
      setUser(parsedUser);
    }
  }

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  useEffect(() => {
    getUser();
    getExpriences();
  }, [userId, user]);

  function logout() {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    navigate("/login");
  }

  async function getExpriences() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    try {
      const {
        data: { pagination },
      } = await request.get(`messages`, {
        params: {
          whom: userId,
          // page: page,
          // limit: LIMIT,
        },
      });
      setTotal(pagination.total);
    } finally {
      console.log("success");
      
    }
  }

  return (
    <Fragment>
      <section id="sidebar" className={sidebarVisible ? "hide" : ""}>
        <Link to="/" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">Admin Portfolio</span>
        </Link>
        <ul className="side-menu top">
          <li className={activeMenuItem === "expriences" ? "active" : ""}>
            <Link
              to="/expriences"
              onClick={() => handleMenuItemClick("expriences")}
            >
              <i className="bx bxs-dashboard"></i>
              <span className="text">expriences</span>
            </Link>
          </li>
          <li className={activeMenuItem === "skills" ? "active" : ""}>
            <Link to="/skills" onClick={() => handleMenuItemClick("skills")}>
              <i className="bx bxl-react"></i>
              <span className="text">Skills</span>
            </Link>
          </li>
          <li className={activeMenuItem === "portfolios" ? "active" : ""}>
            <Link
              to="/portfolios"
              onClick={() => handleMenuItemClick("portfolios")}
            >
              <i className="bx bxl-linkedin-square"></i>
              <span className="text">Portfolios</span>
            </Link>
          </li>
          <li className={activeMenuItem === "education" ? "active" : ""}>
            <Link
              to="/education"
              onClick={() => handleMenuItemClick("education")}
            >
              <i className="bx bxs-bank"></i>
              <span className="text">Education</span>
            </Link>
          </li>
          <li className={activeMenuItem === "message" ? "active" : ""}>
            <Link to="/message" onClick={() => handleMenuItemClick("message")}>
              <i className="bx bxs-shopping-bag-alt"></i>
              <span className="text">Message</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="bx bxs-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <a onClick={() => logout()} className="logout">
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        <nav className="navbar">
          <div onClick={toggleSidebar}>
            <i className="bx bx-menu"></i>
          </div>
          <a href="#" className="nav-link">
            Nuramtov Zukhriddin
          </a>

          <input type="checkbox" id="switch-mode" hidden />
          <label className="switch-mode"></label>
          <Link to='/message' className="notification">
            <i className="bx bxs-bell"></i>
            <span className="num">{total}</span>
          </Link>
          <button onClick={showModal} className="profile">
            <img src={avatar} alt="avatar" />
          </button>
        </nav>
        <div
          id={isModalOpen ? "user__modal__modal" : ""}
          className="user__modal"
        >
          <div className="user__modal__img">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="user__modal__account">
            <button>
              <Link to="https://sarf.uz">
                <i className="bx bxs-user-circle"></i> view profile
              </Link>
            </button>
            <button>
              <i className="bx bxs-user-account"></i> Account
            </button>
            <button>
              <i className="bx bx-cog"></i> Setting
            </button>
            <button>
              <i className="bx bx-ghost"></i> FAQ
            </button>
          </div>
          <div className="user__modal__logout">
            <button>
              <i className="bx bx-log-out-circle"></i> Logout
            </button>
          </div>
        </div>
        <Outlet />
      </section>
    </Fragment>
  );
};

export default AdminLayout;
