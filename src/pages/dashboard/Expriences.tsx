import { Fragment, useState, useEffect } from "react";
import ExpriencesType from "../../types/expriences";
import Cookies from "js-cookie";
import request from "../../server";
import { Pagination } from "antd";
import { LIMIT, USER_ID } from "../../constants";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";

import "./style.scss";
const ExpriencesPage = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [expriences, setExpriences] = useState<ExpriencesType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [selected, setSelected] = useState<string | number | null>(null);
  const [activeForm, setActiveForm] = useState(false);
  const [search, setSearch] = useState("");
  const [values, setValues] = useState({
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getExpriences();
  }, [userId]);

  async function getExpriences() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true);
    try {
      const {
        data: { pagination, data },
      } = await request.get(`experiences`, {
        params: {
          user: userId,
          page: page,
          limit: LIMIT,
          search: search,
        },
      });
      setExpriences(data);
      setTotal(pagination.total);
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
      setLoading(true);
      if (selected === null) {
        await request.post("experiences", values);
      } else {
        await request.put(`experiences/${selected}`, values);
      }
      getExpriences();
    } finally {
      setLoading(false);
      setActiveForm(false);
    }
  }

  const openModal = () => {
    setSelected(null);
    setActiveForm(true);
    setValues({
      workName: "",
      companyName: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  async function editExperiences(id: string) {
    setActiveForm(true);
    setSelected(id);
    try {
      const { data } = await request.get(`experiences/${id}`);
      console.log(data);

      setValues({
        workName: data.workName,
        companyName: data.companyName,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      });
    } finally {
      setLoading(false);
    }
  }

  const deleteExperiences = async (id: string) => {
    if (confirm("O'chirishni hohlesizmi")) {
      await request.delete(`experiences/${id}`);
      getExpriences();
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    getExpriences();
  };

  const handeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getExpriences();
  };

  return (
    <Fragment>
      {loading ? (
        <AxiosLoading />
      ) : (
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Expriences({total})</h1>
            </div>
            <div className="add">
              <button onClick={openModal} className="adding__btn">
                <i className="bx bxs-comment-add"></i>
                Add to Exprience
              </button>
            </div>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
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
                <i className="bx bx-filter"></i>
              </div>
              {total ? (
                <table>
                  <thead>
                    <tr>
                      <th>workName</th>
                      <th>companyName</th>
                      <th>description</th>
                      <th>startDate</th>
                      <th>endDate</th>
                      <th>actiond</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expriences?.map((ex) => (
                      <tr key={ex._id}>
                        <td>
                          <span className="status completed">
                            <h3>{ex.workName}</h3>
                          </span>
                        </td>

                        <td>
                          <span className="status completed">
                            {ex.companyName}
                          </span>
                        </td>
                        <td>
                          <p>{ex.description}</p>
                        </td>
                        <td>{ex.startDate.split("T")[0]}</td>
                        <td>{ex.endDate.split("T")[0]}</td>
                        <td style={{ display: "flex", gap: "20px" }}>
                          <button
                            onClick={() => editExperiences(ex?._id)}
                            className="crud__table__edit"
                          >
                            <i className="bx bxs-edit-alt"></i>
                          </button>
                          <button
                            onClick={() => deleteExperiences(ex?._id)}
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
              ) : (
                <div className="nodata">
                  <img
                    src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1698599363~exp=1698599963~hmac=33aceb8ae26a83c993a9d6d5df58d53385eec1471543b2e718b580cca547bf82"
                    alt="nodata"
                  />
                </div>
              )}
            </div>
          </div>
          <div className={activeForm ? "experiences" : "experiencesActive"}>
            <form className="experiences__form" onSubmit={handleSubmit}>
              <div className="experiences__form__workName">
                <label>workName</label>
                <input
                  type="text"
                  name="workName"
                  value={values.workName}
                  onChange={handleChange}
                />
              </div>
              <div className="experiences__form__companyName">
                <label>companyName</label>
                <input
                  type="text"
                  name="companyName"
                  value={values.companyName}
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

export default ExpriencesPage;
