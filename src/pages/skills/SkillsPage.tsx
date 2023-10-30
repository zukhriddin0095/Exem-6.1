import { Fragment, useEffect, useState } from "react";
import { LIMIT, USER_ID } from "../../constants";
import Cookies from "js-cookie";
import Skill from "../../types/skill";
import { Pagination } from "antd";
import request from "../../server";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";
import "./style.scss";
const SkillsPage = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [skills, setskills] = useState<Skill[] | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [values, setValues] = useState({
    name: "",
    percent: "",
  });

  useEffect(() => {
    getSkill();
  }, [userId]);

  async function getSkill() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true);
    try {
      const {
        data: { data, pagination },
      } = await request.get(`skills`, {
        params: {
          user: userId,
          page: page,
          limit: LIMIT,
          search: search,
        },
      });
      setTotal(pagination.total);
      setskills(data);
    } finally {
      setLoading(false);
    }
  }

  const showModal = () => {
    setValues({
      name: "",
      percent: "",
    });
    setSelected(null);
    setIsModalOpen(true);
  };

  // inputvalues

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // inputvalues

  async function handeOk(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (selected === null) {
        await request.post("skills", values);
      } else {
        await request.put(`skills/${selected}`, values);
      }
      getSkill();
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  }

  async function editSkill(id: string) {
    setSelected(id);
    try {
      setIsModalOpen(true);
      const { data } = await request.get(`skills/${id}`);
      setValues({
        name: data.name,
        percent: data.percent,
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteSkill(id: string) {
    if (confirm("O'chirishni hohlesizmi")) {
      await request.delete(`skills/${id}`);
      getSkill();
    }
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    getSkill();
  };

  const handeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    getSkill();
  };

  return (
    <Fragment>
      {loading ? (
        <AxiosLoading />
      ) : (
        <section className="skills">
          <div className="skills__wrapper">
            <div className="head">
              <h3>skills ({total})</h3>
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
              <button className="add__btn" onClick={showModal}>
                <i className="bx bx-add-to-queue"></i>
              </button>
            </div>
            {total ? (
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">Skill</div>
                  <div className="col col-2">Percent</div>
                  <div className="col col-4">ACtions</div>
                </li>
                {skills?.map((skill) => (
                  <li key={skill._id} className="table-row">
                    <div className="col col-1" data-label="Job Id">
                      {skill?.name}
                    </div>
                    <div className="col col-2" data-label="Customer Name">
                      {skill?.percent}
                    </div>
                    <div className="col col-4" data-label="Payment Status">
                      <div className="crud__table">
                        <button
                          onClick={() => editSkill(skill?._id)}
                          className="crud__table__edit"
                        >
                          <i className="bx bxs-edit-alt"></i>
                        </button>
                        <button
                          onClick={() => deleteSkill(skill?._id)}
                          className="crud__table__delete"
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="nodata">
                <img
                  src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1698599363~exp=1698599963~hmac=33aceb8ae26a83c993a9d6d5df58d53385eec1471543b2e718b580cca547bf82"
                  alt="nodata"
                />
              </div>
            )}
          </div>

          <div className="modalik" id={isModalOpen ? "modalik__active" : ""}>
            <form onSubmit={handeOk}>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modalik__close"
              >
                X
              </button>
              <h3>Add to skill</h3>
              <input
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              <input
                name="percent"
                type="text"
                value={values.percent}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <Pagination
            defaultCurrent={1}
            pageSize={LIMIT}
            total={total}
            current={page}
            onChange={handlePageChange}
          />
        </section>
      )}
    </Fragment>
  );
};

export default SkillsPage;
