import { Fragment, useState, useEffect } from "react";
import ExpriencesType from "../../types/expriences";
import Cookies from "js-cookie";
import request from "../../server";
import { USER_ID } from "../../constants";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";

import "./style.scss";
const ExpriencesPage = () => {
  const [total, setTotal] = useState<string | number>(0);
  const [expriences, setExpriences] = useState<ExpriencesType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [selected, setSelected] = useState<string | number | null>(null);
  const [activeForm, setActiveForm] = useState(false);
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
          // page: page,
          // limit: LIMIT,
        },
      });
      setTotal(pagination.total);
      setExpriences(data);
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
              <button onClick={openModal} className="adding__btn" >
                <i className="bx bxs-comment-add"></i>
                Add to Exprience
              </button>
            </div>
          </div>

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
        </main>
      )}
    </Fragment>
  );
};

export default ExpriencesPage;
