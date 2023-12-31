import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import request from "../../server";
import { Pagination } from "antd";

import { LIMIT, USER_ID } from "../../constants";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";
import EducationType from "../../types/education";

const EducationPage = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [education, setEducation] = useState<EducationType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [selected, setSelected] = useState<string | number | null>(null);
  const [activeForm, setActiveForm] = useState(false);
  const [values, setValues] = useState({
    name: "",
    level: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getEducation();
  }, [userId]);

  async function getEducation() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true);
    try {
      const {
        data: { pagination, data },
      } = await request.get(`education`, {
        params: {
          user: userId,
          page: page,
          limit: LIMIT,
          search: search,
        },
      });
      setTotal(pagination.total);
      setEducation(data);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (selected === null) {
        await request.post("education", values);
      } else {
        await request.put(`education/${selected}`, values);
      }
      getEducation();
    } finally {
      setLoading(false);
      setActiveForm(false);
    }
  }

  const openModal = () => {
    setSelected(null);
    setActiveForm(true);
    setValues({
      name: "",
      level: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  async function editEducation(id: string) {
    setActiveForm(true);
    setSelected(id);
    try {
      const { data } = await request.get(`education/${id}`);
      console.log(data);

      setValues({
        name: data.name,
        level: data.level,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    } finally {
      setLoading(false);
    }
  }

  const deleteEducation = async (id: string) => {
    if (confirm("O'chirishni hohlesizmi")) {
      await request.delete(`education/${id}`);
      getEducation();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    getEducation();
  };

  const handeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getEducation();
  };

  return (
    <Fragment>
      {loading ? (
        <AxiosLoading />
      ) : (
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Education({total})</h1>
              <form>
                <div className="form-input">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    placeholder="Search..."
                  />
                  <button
                    onClick={(e) => handeSearch(e)}
                    type="submit"
                    className="search-btn"
                  >
                    <i className="bx bx-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="add">
              <button onClick={openModal} className="adding__btn">
                <i className="bx bxs-comment-add"></i>
                Add to Education
              </button>
            </div>
          </div>

          {total ? (
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3>Recent Orders</h3>
                  <i className="bx bx-search"></i>
                  <i className="bx bx-filter"></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>level</th>
                      <th>description</th>
                      <th>startDate</th>
                      <th>endDate</th>
                      <th>actiond</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education?.map((edu) => (
                      <tr key={edu._id}>
                        <td>
                          <span className="status completed">
                            <h3>{edu.name}</h3>
                          </span>
                        </td>

                        <td>
                          <span className="status completed">{edu.level}</span>
                        </td>
                        <td>
                          <p>{edu.description}</p>
                        </td>
                        <td>{edu.startDate.split("T")[0]}</td>
                        <td>{edu.endDate.split("T")[0]}</td>
                        <td style={{ display: "flex", gap: "20px" }}>
                          <button
                            onClick={() => editEducation(edu?._id)}
                            className="crud__table__edit"
                          >
                            <i className="bx bxs-edit-alt"></i>
                          </button>
                          <button
                            onClick={() => deleteEducation(edu?._id)}
                            className="crud__table__delete"
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="nodata">
              <img
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1698599363~exp=1698599963~hmac=33aceb8ae26a83c993a9d6d5df58d53385eec1471543b2e718b580cca547bf82"
                alt="nodata"
              />
            </div>
          )}

          <div className={activeForm ? "experiences" : "experiencesActive"}>
            <form className="experiences__form" onSubmit={handleSubmit}>
              <div className="experiences__form__workName">
                <label>name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
              <div className="experiences__form__companyName">
                <label>level</label>
                <input
                  type="text"
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                />
              </div>
              <div className="experiences__form__description">
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>
              <div className="experiences__form__startDate">
                <label>startDate</label>
                <input
                  type="text"
                  name="startDate"
                  value={values.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="experiences__form__endDate">
                <label>endDate</label>
                <input
                  type="text"
                  name="endDate"
                  value={values.endDate}
                  onChange={handleChange}
                />
              </div>
              <button className="experiences__form__btn">
                add to Exprience
              </button>
              <div onClick={() => setActiveForm(false)} className="close">
                <i className="bx bxs-tag-x"></i>
              </div>
            </form>
          </div>
          <Pagination
            defaultCurrent={1}
            pageSize={LIMIT}
            total={total}
            current={page}
            onChange={handlePageChange}
          />
        </main>
      )}
    </Fragment>
  );
};

export default EducationPage;
