import { Fragment, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { TOKEN, USER, USER_ID } from "../../../constants";
import avatar from "../../../assets/avatar.jpg";
import request from "../../../server";

import "./style.scss";
import User from "../../../types/user";
const AdminLayout = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("/expriences");
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

  useEffect(() => {
    const pathname = location.pathname;
    setActiveMenuItem(pathname);
    getUser();
  }, []);

  async function getUser() {
    try {
      const { data } = await request.get("auth/me", {
        params: userId,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userId);

  console.log(user);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  useEffect(() => {
    // getUser();
    getExpriences();
  }, []);

  function logout() {
    Cookies.remove(TOKEN);
    Cookies.remove(USER_ID);
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
        },
      });
      setTotal(pagination.total);
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      console.log("success");
    }
  }

  console.log(user);
  const AccountN = () => {
    navigate("/account");
  };

  const externalUrl = `https://exem-6-2.vercel.app?${userId}`;
  // const externalUrl = `http://localhost:5174/?${userId}`;

  console.log(user);

  return (
    <Fragment>
      <section id="sidebar" className={sidebarVisible ? "hide" : ""}>
        <Link to="/" className="brand">
          <i className="bx bxs-smile"></i>
          <span className="text">Admin Portfolio</span>
        </Link>
        <ul className="side-menu top">
          <li className={activeMenuItem === "/expriences" ? "active" : ""}>
            <Link
              to="/expriences"
              onClick={() => handleMenuItemClick("/expriences")}
            >
              <i className="bx bxs-dashboard"></i>
              <span className="text">expriences</span>
            </Link>
          </li>
          <li className={activeMenuItem === "/skills" ? "active" : ""}>
            <Link to="/skills" onClick={() => handleMenuItemClick("/skills")}>
              <i className="bx bxl-react"></i>
              <span className="text">Skills</span>
            </Link>
          </li>
          <li className={activeMenuItem === "/portfolios" ? "active" : ""}>
            <Link
              to="/portfolios"
              onClick={() => handleMenuItemClick("/portfolios")}
            >
              <i className="bx bxl-linkedin-square"></i>
              <span className="text">Portfolios</span>
            </Link>
          </li>
          <li className={activeMenuItem === "/education" ? "active" : ""}>
            <Link
              to="/education"
              onClick={() => handleMenuItemClick("/education")}
            >
              <i className="bx bxs-bank"></i>
              <span className="text">Education</span>
            </Link>
          </li>
          <li className={activeMenuItem === "/message" ? "active" : ""}>
            <Link to="/message" onClick={() => handleMenuItemClick("/message")}>
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
          <Link to="/message" className="notification">
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
            <img
              src={
                `https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}` ||
                "https://thumbs.dreamstime.com/b/flat-male-avatar-image-beard-hairstyle-businessman-profile-icon-vector-179285629.jpg"
              }
              alt="avatar"
            />
          </div>
          <div className="user__modal__account">
            <button>
              <Link target="_blank" to={externalUrl}>
                <i className="bx bxs-user-circle"></i> view profile
              </Link>
            </button>
            <button onClick={AccountN}>
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
            <button onClick={logout}>
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
