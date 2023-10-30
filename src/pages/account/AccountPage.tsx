import { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";

import request from "../../server";
import { toast } from "react-toastify";

import avatar from "../../assets/avatar.jpg";
import "./style.scss";
import { USER_ID } from "../../constants";
import User from "../../types/user";

const AccountPage = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    fields: "",
    info: "",
    phoneNumber: "",
    birthday: "",
    address: "",
    email: "",
    github: "",
    linkedin: "",
    telegram: "",
    instagram: "",
    youtube: "",
    facebook: "",
    photo: "",
  });
  // const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const form = new FormData();
      // form.append("file", e.target.files[0]);
      if (e.target.files) {
        form.append("file", e.target.files[0]);
      }
      await request.post("auth/upload", form);
      getUser();
      toast.success("success");

      // setImage(data);
    } finally {
      console.log("asdas");
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function handeOk(e: React.FormEvent) {
    e.preventDefault();
    try {
      await request.put("auth/updatedetails", values);
      toast.success("success");
    } finally {
      console.log("");
    }
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await request.put("auth/updatepassword", formData);
      toast.success("success");
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      console.log("");
    }
  };

  async function getUser() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    try {
      const { data } = await request.get(`users/${userId}`);
      setUser(data);
    } catch (err) {
      toast.error("Serverda xatolik yuz berdi");
    }
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  const handleUploadClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  return (
    <Fragment>
      <section className="account">
        <div className="updateinfo">
          <form onSubmit={handeOk} className="updateinfo__form">
            <h1>Edit your information</h1>
            <div className="updateinfo__form__firstName">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__lastName">
              <label>last Name</label>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__username">
              <label>username</label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__fields">
              <label>fields</label>
              <input
                type="text"
                name="fields"
                value={values.fields}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__info">
              <label>info</label>
              <input
                type="text"
                name="info"
                value={values.info}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__phoneNumber">
              <label>phoneNumber</label>
              <input
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__birthday">
              <label>birthday</label>
              <input
                type="text"
                name="birthday"
                value={values.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__address">
              <label>address</label>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__email">
              <label>email</label>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__github">
              <label>github</label>
              <input
                type="text"
                name="github"
                value={values.github}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__linkedin">
              <label>linkedin</label>
              <input
                type="text"
                name="linkedin"
                value={values.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__telegram">
              <label>telegram</label>
              <input
                type="text"
                name="telegram"
                value={values.telegram}
                onChange={handleChange}
              />
            </div>

            <div className="updateinfo__form__instagram">
              <label>instagram</label>
              <input
                type="text"
                name="instagram"
                value={values.instagram}
                onChange={handleChange}
              />
            </div>
            <button className="" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="update__password">
          <div className="update__photo">
            <div className="avatar-wrapper">
              <div className="upload-button" onClick={handleUploadClick}>
                <img
                  className="avatar_update"
                  src={
                    `https://ap-portfolio-backend.up.railway.app/upload/${user?.photo}` ||
                    avatar
                  }
                  alt="avatar"
                />
              </div>
              <input
                id="file-upload"
                className="file-upload"
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
              />
              <h3 onClick={handleUploadClick} className="title-update">
                update photo
              </h3>
            </div>
          </div>
          <h1>update password</h1>
          <form className="update__password__form" onSubmit={handleSubmit}>
            <label>username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handlePassword}
            />
            <label>Current password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handlePassword}
            />
            <label>new password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handlePassword}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default AccountPage;
