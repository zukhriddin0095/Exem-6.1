import { Fragment, useState } from "react";
import request from "../../server";
import { toast } from "react-toastify";

import "./style.scss";
const AccountPage = () => {
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
  const [photo, setPhoto] = useState(null);
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
      const { data } = await request.post("upload", form);
      setPhoto(data);
      console.log(photo);
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
    const user = { ...values, photo: photo };
    try {
      await request.put("auth/updatedetails", user);
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
    }catch(err){
      toast.error("serverda hatolik")
    } finally {
      console.log("");
    }
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

            <div className="updateinfo__form__photo">
              <label>Photo</label>
              <input
                type="file"
                name="Photo"
                onChange={(e) => uploadImage(e)}
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
