import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { USER_ID } from "../../constants";
import MessageType from "../../types/message";
import request from "../../server";
import AxiosLoading from "../../components/loading/axiosLoading/AxiosLoading";

const MessagePage = () => {
  const [message, setMessage] = useState<MessageType[] | null>(null);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<string | number>(0);

  useEffect(() => {
    getMessage();
  }, [userId]);

  async function getMessage() {
    const userId = Cookies.get(USER_ID);
    if (userId !== undefined) {
      setUserId(userId);
    }
    setLoading(true);
    try {
      const {
        data: { pagination, data },
      } = await request.get(`messages`, {
        params: {
          whom: userId,
          // page: page,
          // limit: LIMIT,
        },
      });
      setTotal(pagination.total);
      setMessage(data);
    } finally {
      setLoading(false);
    }
  }

  const deleteMessage = async (id: string) => {
    if (confirm("Haqiqatdan ham o'chirishni hohlasizmi")) {
      await request.delete(`messages/${id}`);
      getMessage();
    }
  };
  
  return (
    <Fragment>
      {loading ? (
        <AxiosLoading />
      ) : (
        <main>
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Message ({total})</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>message</th>
                    <th>title</th>
                    <th>whom</th>
                    <th>user number</th>
                    <th>actiond</th>
                  </tr>
                </thead>
                <tbody>
                  {message?.map((msg) => (
                    <tr key={msg._id}>
                      <td>
                        <span className="status completed">
                          <h3>{msg.message}</h3>
                        </span>
                      </td>
                      <td>
                        <span className="status completed">{msg.title}</span>
                      </td>
                      <td>
                        {msg?.whom?.firstName} {msg?.whom?.lastName}
                      </td>
                      <td>{msg?.user}</td>
                      <td style={{ display: "flex", gap: "20px" }}>
                        {/* <button
                          // onClick={() => editEducation(edu?._id)}
                          className="crud__table__edit"
                        >
                          <i className="bx bxs-edit-alt"></i>
                        </button> */}
                        <button
                          onClick={() => deleteMessage(msg?._id)}
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
        </main>
      )}
    </Fragment>
  );
};

export default MessagePage;
