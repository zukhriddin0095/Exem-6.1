import React, { Fragment, useEffect, useState } from "react";
import request from "../../server";
import { ENDPOINT, LIMIT, USER_ID } from "../../constants";
import Cookies from "js-cookie";
import ProtfoliosType from "../../types/portfolio";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";

import "./style.scss";
const PortfoliosPage = () => {
  const [total, setTotal] = useState(0);
  const [portfolios, setPortfolios] = useState<ProtfoliosType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | number | null>(null);
  const [photo, setPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const [values, setValues] = useState({
    name: "",
    url: "",
    description: "",
    photo: "",
  });

  useEffect(() => {
    getPortfolios();
  }, [userId, page, total]);

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

  async function getPortfolios() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true);
    try {
      const {
        data: { pagination, data },
      } = await request.get(`portfolios`, {
        params: {
          user: userId,
          page: page,
          limit: LIMIT,
          search: search,
        },
      });
      setTotal(pagination.total);
      setPortfolios(data);
    } finally {
      setLoading(false);
    }
  }

  async function handeOk(e: React.FormEvent) {
    e.preventDefault();
    const user = { ...values, photo: photo };
    try {
      if (selected === null) {
        await request.post("portfolios", user);
      } else {
        await request.put(`portfolios/${selected}`, user);
      }
      getPortfolios();
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const openModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    setValues({
      name: "",
      url: "",
      description: "",
      photo: "",
    });
  };

  async function editProtfolio(id: string) {
    setIsModalOpen(true);
    setSelected(id);
    try {
      setIsModalOpen(true);
      const { data } = await request.get(`portfolios/${id}`);
      console.log(data);

      setValues({
        name: data.name,
        url: data.url,
        description: data.description,
        photo: data.photo,
      });
    } finally {
      setLoading(false);
    }
  }

  const deletePortfolio = async (id: string) => {
    if (confirm("O'chirishni hohlesizmi")) {
      await request.delete(`portfolios/${id}`);
      getPortfolios();
    }
  };

  const closemodal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    getPortfolios();
  };

   const handeSearch = (e: React.FormEvent) => {
     e.preventDefault();
     getPortfolios();
   };
   
  return (
    <Fragment>
      {loading ? (
        <AxiosLoading />
      ) : (
        <section className="portfolios">
          <div className="portfolios__wrapper">
            <div className="head">
              <h3>portfolios ({total})</h3>
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
              <button onClick={openModal}>
                <i className="bx bx-add-to-queue"></i>
              </button>
            </div>
            {total ? (
              <ul className="responsive-table">
                <li className="table-header">
                  <div className="col col-1">Name</div>
                  <div className="col col-2">url</div>
                  <div className="col col-3">Photo</div>
                  <div className="col col-4">ACtions</div>
                </li>
                {portfolios?.map((port) => (
                  <li key={port._id} className="table-row">
                    <div className="col col-1" data-label="Job Id">
                      {port?.name}
                    </div>
                    <div className="col col-2" data-label="Customer Name">
                      <Link to={port?.url}>{port?.url}</Link>
                    </div>
                    <div className="col col-2" data-label="Customer Name">
                      <img
                        className="avatar"
                        src={`${ENDPOINT}upload/${port?.photo?._id}.${
                          port?.photo?.name.split(".")[1]
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="col col-4" data-label="Payment Status">
                      <div className="crud__table">
                        <button
                          onClick={() => editProtfolio(port?._id)}
                          className="crud__table__edit"
                        >
                          <i className="bx bxs-edit-alt"></i>
                        </button>
                        <button
                          onClick={() => deletePortfolio(port?._id)}
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
              <button onClick={(e) => closemodal(e)} className="modalik__close">
                X
              </button>
              <h3>Add to skill</h3>
              <input
                value={values.name}
                name="name"
                type="text"
                onChange={handleChange}
              />
              <input
                value={values.url}
                name="url"
                type="text"
                onChange={handleChange}
              />
              <input
                value={values.description}
                name="description"
                type="text"
                onChange={handleChange}
              />
              <input
                name="photo"
                type="file"
                onChange={(e) => uploadImage(e)}
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

export default PortfoliosPage;
