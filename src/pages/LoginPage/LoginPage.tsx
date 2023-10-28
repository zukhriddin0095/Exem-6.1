import request from "../../server";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/auth";
import { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { TOKEN, USER, USER_ID } from "../../constants";
import Login from "../../types/login";

import "./style.scss";
import AccountType from "../../types/account";
import User from "../../types/user";

const LoginPage = () => {
  const login = useAuth((state) => state.login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState<Login>({
    username: "",
    password: "",
  });
  const [user, setUser] = useState<AccountType>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  useEffect(() => {}, [active]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      data: { token, user },
    } = await request.post<{ token: string; user: User }>(
      "auth/login",
      formData
    );
    Cookies.set(TOKEN, token);
    Cookies.set(USER_ID, user._id);
    localStorage.setItem(USER, JSON.stringify(user));
    login(user);
    navigate("/expriences");
  }

  const handleRegister = async(e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
     await request.post("auth/register", user);
     navigate("/user")
    }finally{
      setLoading(false)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // user obyektini o'zgartirish
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <Fragment>
      <div className="Login">
        <div
          className={`container ${active ? "right-panel-active" : ""}`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input
                name="firstName"
                type="text"
                placeholder="Firstname"
                value={user.firstName}
                onChange={handleChange}
              />
              <input
                name="lastName"
                type="text"
                placeholder="lastName"
                value={user.lastName}
                onChange={handleChange}
              />
              <input
                name="username"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="password"
                value={user.password}
                onChange={handleChange}
              />
              {loading ? <div>loading ....</div> : <button type="submit">Sign Up</button>}
            </form>
          </div>
          {/* userName */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit}>
              <h1>Sign in</h1>

              <span>or use your account</span>
              <input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>
          {/* userName */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={() => setActive(false)}
                  className="ghost"
                  id="signIn"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  onClick={() => setActive(true)}
                  className="ghost"
                  id="signUp"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
