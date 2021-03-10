/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../../Config/api";
import TableList from "../../Components/TableList";

//Image
import logoPic from "../../Image/IconMini.png";
import profilePic from "../../Image/ProfilePic.png";

//css
import "./Transaction.css";

//context
import { AppContext } from "../../Context/globalContext";

const TransactionPage = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const goAddBook = () => {
    history.push(`/addbook`);
  };

  const getTransaction = async () => {
    try {
      setLoading(true);

      const allTransaction = await API.get("/transactions");

      setLoading(false);

      setTransaction(allTransaction.data.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const approved = async (id) => {
    try {
      const approveData = JSON.stringify({
        remainingActive: 30,
        userStatus: true,
        paymentStatus: "Approved",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const approved = await API.patch(
        `transaction/${id}`,
        approveData,
        config
      );

      getTransaction();

      console.log(approved);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelled = async (id) => {
    try {
      const cancelData = JSON.stringify({
        remainingActive: 0,
        userStatus: false,
        paymentStatus: "Cancelled",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const cancelled = await API.patch(
        `transaction/${id}`,
        cancelData,
        config
      );

      getTransaction();

      console.log(cancelled);
    } catch (err) {
      console.log(err);
    }
  };

  return loading ? (
    <div class="loader">Loading...</div>
  ) : (
    <div className="transaction-body">
      <div className="container-fluid">
        <div className="row">
          <div>
            <img className="logos" src={logoPic} alt="" />
          </div>
          <div className="col-md-10"></div>
          <div>
            <div class="dropdown">
              <img className="foto" src={profilePic} alt="" />
              <div class="dropdown-content">
                <a onClick={goAddBook}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.8762 19.9345V0H5.26825C2.38934 0 0.0338745 2.35547 0.0338745 5.23438V34.7656C0.0338745 37.6565 2.37739 40 5.26825 40H29.7247C35.3245 40 39.9904 35.4184 39.9661 29.8187C39.9449 24.9502 36.4737 20.8809 31.8762 19.9345ZM29.5367 19.7314C24.3672 19.8788 20.1551 23.9153 19.729 29.0115H9.49512V2.33945H29.5367V19.7314ZM5.23458 2.33945H7.15567V29.0115H5.52809C4.38442 29.0115 3.32153 29.3631 2.44106 29.9634V5.13297C2.44106 3.59258 3.69419 2.33945 5.23458 2.33945ZM5.52809 37.6605C3.78856 37.6605 2.37333 36.2453 2.37333 34.5058C2.37333 32.7663 3.78856 31.351 5.52809 31.351H19.8023C19.9008 32.0181 20.0647 32.6642 20.287 33.2827H6.02997V35.6222H21.4925C22.02 36.3836 22.6487 37.0697 23.3595 37.6605H5.52809ZM29.8295 37.6605C25.5301 37.6605 22.0323 34.1628 22.0323 29.8634C22.0323 25.5641 25.5301 22.0663 29.8295 22.0663C34.1288 22.0663 37.6266 25.5641 37.6266 29.8634C37.6266 34.1628 34.1289 37.6605 29.8295 37.6605Z"
                      fill="#929292"
                    />
                    <path
                      d="M30.9993 26.2985H28.6598V28.6936H26.2645V31.0331H28.6598V33.4283H30.9993V31.0331H33.3945V28.6936H30.9993V26.2985Z"
                      fill="#929292"
                    />
                    <path
                      d="M15.7357 6.88831H23.5654V9.22776H15.7357V6.88831Z"
                      fill="#929292"
                    />
                    <path
                      d="M13.0909 11.9673H26.2101V14.3067H13.0909V11.9673Z"
                      fill="#929292"
                    />
                  </svg>{" "}
                  Add Book
                </a>
                <a onClick={() => dispatch({ type: "LOGOUT" })}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.218 11.7192H14.3224C13.8911 11.7192 13.5411 11.3692 13.5411 10.938C13.5411 10.5067 13.8911 10.1567 14.3224 10.1567H24.218C24.6492 10.1567 24.9992 10.5067 24.9992 10.938C24.9992 11.3692 24.6492 11.7192 24.218 11.7192Z"
                      fill="#929292"
                    />
                    <path
                      d="M20.3118 15.6252C20.1117 15.6252 19.9118 15.5491 19.7596 15.3962C19.4545 15.0908 19.4545 14.5961 19.7596 14.2909L23.1138 10.9369L19.7596 7.58276C19.4545 7.27759 19.4545 6.78284 19.7596 6.47768C20.065 6.17232 20.5597 6.17232 20.8649 6.47768L24.771 10.3838C25.0762 10.689 25.0762 11.1837 24.771 11.4889L20.8649 15.395C20.7118 15.5491 20.5119 15.6252 20.3118 15.6252Z"
                      fill="#929292"
                    />
                    <path
                      d="M8.33314 25C8.11018 25 7.89866 24.9687 7.68733 24.9031L1.41864 22.8146C0.565702 22.5167 0 21.7219 0 20.8335V2.08406C0 0.935113 0.934381 0.000732422 2.08333 0.000732422C2.3061 0.000732422 2.51762 0.032012 2.72914 0.0976227L8.99764 2.1861C9.85077 2.48402 10.4163 3.27879 10.4163 4.16721V22.9166C10.4163 24.0656 9.48209 25 8.33314 25ZM2.08333 1.56318C1.79686 1.56318 1.56245 1.79759 1.56245 2.08406V20.8335C1.56245 21.0553 1.71141 21.2615 1.92388 21.3355L8.1632 23.4146C8.20802 23.4291 8.26638 23.4375 8.33314 23.4375C8.61961 23.4375 8.85383 23.2031 8.85383 22.9166V4.16721C8.85383 3.94539 8.70487 3.73921 8.4924 3.66521L2.25308 1.58607C2.20826 1.57158 2.1499 1.56318 2.08333 1.56318Z"
                      fill="#929292"
                    />
                    <path
                      d="M15.8849 8.33387C15.4536 8.33387 15.1037 7.98388 15.1037 7.55264V2.86529C15.1037 2.14758 14.5194 1.56318 13.8017 1.56318H2.08335C1.65211 1.56318 1.30212 1.2132 1.30212 0.781958C1.30212 0.35072 1.65211 0.000732422 2.08335 0.000732422H13.8017C15.3819 0.000732422 16.6661 1.2851 16.6661 2.86529V7.55264C16.6661 7.98388 16.3161 8.33387 15.8849 8.33387Z"
                      fill="#929292"
                    />
                    <path
                      d="M13.8016 21.8751H9.63499C9.20375 21.8751 8.85376 21.5251 8.85376 21.0939C8.85376 20.6627 9.20375 20.3127 9.63499 20.3127H13.8016C14.5194 20.3127 15.1036 19.7283 15.1036 19.0106V14.3232C15.1036 13.892 15.4536 13.542 15.8848 13.542C16.316 13.542 16.666 13.892 16.666 14.3232V19.0106C16.666 20.5907 15.3818 21.8751 13.8016 21.8751Z"
                      fill="#929292"
                    />
                  </svg>{" "}
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row transaction-content">
          <div className="col-md">
            <p className="transaction-header">Incoming Transaction</p>
          </div>
        </div>
        <div className="row transaction-content">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Transfer Proof</th>
                  <th>Active Duration</th>
                  <th>Status User</th>
                  <th>Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <TableList
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                    approved={approved}
                    cancelled={cancelled}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
